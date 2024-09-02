import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, ViewStyle, TextStyle, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Sound } from "expo-av/build/Audio";
import { AVPlaybackStatus } from "expo-av";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { IMemo } from "@/app/(days)/day7/memos";

interface IMemoListItem {
    item: IMemo;
}

export const MemoListItem = ({ item }: IMemoListItem) => {
    const { uri, metering } = item;
    const [sound, setSound] = useState<Sound>();
    const [soundStatus, setSoundStatus] = useState<AVPlaybackStatus>();

    const handlePlaybackStatus = useCallback(
        async (status: AVPlaybackStatus) => {
            if (status.isLoaded) {
                if (soundStatus === undefined) {
                    setSoundStatus(status);
                } else if (
                    soundStatus.isLoaded &&
                    ((status.positionMillis !== soundStatus.positionMillis &&
                        status.isPlaying === true) ||
                        status.isPlaying !== soundStatus.isPlaying)
                ) {
                    setSoundStatus(status);
                }
            }
        },
        [sound],
    );

    const loadSound = async () => {
        console.log("Loading Sound");
        const { sound } = await Sound.createAsync({ uri }, { progressUpdateIntervalMillis: 50 });
        sound.setOnPlaybackStatusUpdate(handlePlaybackStatus);
        setSound(sound);
    };

    const handlePlay = async () => {
        console.log("souns statsu wehn play", sound, soundStatus);
        if (sound) {
            if (soundStatus?.isLoaded && soundStatus.isPlaying) {
                await sound.pauseAsync();
            } else {
                console.log("Playing Sound", sound);
                await sound.replayAsync();
            }
        }
    };

    useMemo(() => {
        if (Platform.OS === "android" && sound) {
            const intervalId = setInterval(() => {
                const updatePlaybackStatus = async () => {
                    sound.getStatusAsync();
                };
                updatePlaybackStatus();
            }, 50);
            return () => clearInterval(intervalId);
        }
    }, [sound]);

    useEffect(() => {
        loadSound();
    }, [uri]);

    useEffect(() => {
        return sound
            ? () => {
                  console.log("Unloading Sound");
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);
    const container: ViewStyle = {
        backgroundColor: "white",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 5,
        margin: 5,
        gap: 10,
        flexDirection: "row",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    };

    const playbackContainer: ViewStyle = {
        flex: 1,
        flexDirection: "row",
        height: 70,
        alignItems: "center",
        // backgroundColor: "red",
    };

    const playbackIndicator: ViewStyle = {
        position: "absolute",
        width: 15,
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: "royalblue",
    };

    const durationTextStyle: TextStyle = {
        position: "absolute",
        right: 0,
        bottom: 0,
        color: "grey",
        fontFamily: "Inter",
        fontSize: 12,
    };

    const wavesContainer: ViewStyle = {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    };

    const waveItem: ViewStyle = {
        flex: 1,
        backgroundColor: "gainsboro",
        borderRadius: 10,
    };

    const isPlaying = soundStatus?.isLoaded ? soundStatus.isPlaying : false;
    const position = soundStatus?.isLoaded ? soundStatus.positionMillis : 0;
    let duration = 1;
    if (soundStatus?.isLoaded) {
        duration =
            Platform.OS === "android"
                ? soundStatus.playableDurationMillis!
                : soundStatus.durationMillis!;
    }
    const progress = position && duration ? (position / duration) * 100 : 0;
    const formatMillis = (mill: number) => {
        const minutes = Math.floor(mill / 60000);
        const seconds = Math.floor((mill % (1000 * 60)) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const reduceWaveformArray = (array: number[], targetLength: number) => {
        const factor = array.length / targetLength;
        const reducedArray = [];

        for (let i = 0; i < targetLength; i++) {
            const start = Math.floor(i * factor);
            const end = Math.ceil((i + 1) * factor);
            const slice = array.slice(start, end);
            const average = slice.reduce((sum, value) => sum + value, 0) / slice.length;
            reducedArray.push(average);
        }

        return reducedArray;
    };
    console.log("du", position);
    const filteredMemo = reduceWaveformArray(metering, 50);
    return (
        <View style={container}>
            <FontAwesome5
                name={isPlaying ? "pause" : "play"}
                onPress={handlePlay}
                size={20}
                color="grey"
            />
            <View style={playbackContainer}>
                <View style={wavesContainer}>
                    {filteredMemo.map((eachMetering: number, eachIndex: number) => {
                        return (
                            <View
                                key={`${uri}${eachIndex}`}
                                style={[
                                    waveItem,
                                    {
                                        height: interpolate(
                                            eachMetering,
                                            [-60, 0],
                                            [5, 50],
                                            Extrapolation.CLAMP,
                                        ),
                                        backgroundColor:
                                            progress / 100 > eachIndex / filteredMemo.length
                                                ? "royalblue"
                                                : "gainsboro",
                                    },
                                ]}
                            />
                        );
                    })}
                </View>
                <View style={[playbackIndicator, { left: `${progress}%` }]} />
                <Text style={durationTextStyle}>
                    {formatMillis(position || 0)} / {formatMillis(duration || 0)}
                </Text>
            </View>
        </View>
    );
};
