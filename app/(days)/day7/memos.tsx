import React, { useState } from "react";
import { View, Text, Button, Pressable, ViewStyle, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { MemoListItem } from "@/src/components/MemoListItem";

export interface IMemo {
    uri: string;
    metering: number[];
}

const Memos = () => {
    const [recording, setRecording] = useState<Recording>();
    const [memos, setMemos] = useState<IMemo[]>([]);
    const [audioMetering, setAudioMetering] = useState<number[]>([]);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const metering = useSharedValue<number>(-100);

    const animatedRedCircle = useAnimatedStyle(() => ({
        width: withTiming(recording ? "60%" : "100%"),
        borderRadius: withTiming(recording ? 5 : 35),
    }));

    const animatedRecordWave = useAnimatedStyle(() => {
        const size = withTiming(interpolate(metering.value, [-60, 0], [0, -40]), { duration: 100 });
        return {
            top: size,
            bottom: size,
            right: size,
            left: size,
        };
    });

    const startRecording = async () => {
        try {
            setAudioMetering([]);
            if (permissionResponse && permissionResponse.status !== "granted") {
                console.log("Requesting permission..");
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log("Starting recording..");
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY,
                (state) => {
                    if (state.metering) {
                        metering.value = state.metering;
                        setAudioMetering((current) => [...current, state.metering!]);
                    }
                },
                100,
            );
            setRecording(recording);
            console.log("Recording started");
        } catch (err) {
            console.error("Failed to start recording", err);
        }
    };

    const stopRecording = async () => {
        if (!recording) {
            return;
        }
        console.log("Stopping recording..");
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        setRecording(undefined);
        metering.value = -100;
        console.log("Recording stopped and stored at", uri);
        if (uri) {
            setMemos([{ uri, metering: audioMetering }, ...memos]);
        }
    };

    const footer: ViewStyle = {
        backgroundColor: "white",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    };

    const recordButton: ViewStyle = {
        width: 70,
        aspectRatio: 1,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "grey",
        padding: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    };

    const waves: ViewStyle = {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#FF000055",
        top: -20,
        right: -20,
        left: -20,
        bottom: -20,
        zIndex: -1,
        borderRadius: 1000,
    };

    const redCircle: ViewStyle = {
        backgroundColor: "orangered",
        aspectRatio: 1,
        borderRadius: 30,
    };
    const container: ViewStyle = {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
    };

    console.log("rec", recording);
    return (
        <SafeAreaView style={container}>
            <Text>Memos</Text>
            <FlatList
                data={memos}
                keyExtractor={(ext, index) => `${ext.uri}${index}`}
                renderItem={({ item }) => {
                    return <MemoListItem item={item} />;
                }}
            />
            <View style={footer}>
                <View>
                    <Pressable
                        style={recordButton}
                        onPress={recording ? stopRecording : startRecording}>
                        <Animated.View style={[redCircle, animatedRedCircle]} />
                    </Pressable>
                    <Animated.View style={[waves, animatedRecordWave]} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Memos;
