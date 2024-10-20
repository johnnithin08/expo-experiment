import React, { useEffect, useState } from "react";
import { View, Image, ViewStyle, ImageStyle, TextStyle, Text, Pressable } from "react-native";
import { IGStories } from "./stories";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    useAnimatedReaction,
    runOnJS,
} from "react-native-reanimated";
import Indicator from "./Indicator";

const Igstories = () => {
    const [userIndex, setUserIndex] = useState<number>(0);
    const [storyIndex, setStoryIndex] = useState<number>(0);
    const progress = useSharedValue(0);

    const user = IGStories[userIndex];
    console.log("user", user, storyIndex);
    const story = user.stories[storyIndex];

    const goToNextUser = () => {
        progress.value = 0;
        setStoryIndex(0);
        if (userIndex === IGStories.length - 1) {
            setUserIndex(0);
            console.log("enter", userIndex);
        } else {
            setUserIndex((index) => index + 1);
        }
    };

    const goToPreviousUser = () => {
        progress.value = 0;
        setStoryIndex(IGStories[userIndex - 1].stories.length - 1);
        setUserIndex((index) => index - 1);
    };

    const prevStory = () => {
        progress.value = 0;
        if (storyIndex === 0) {
            goToPreviousUser();
        } else {
            setStoryIndex((index) => index - 1);
        }
    };

    const nextStory = () => {
        progress.value = 0;
        if (storyIndex === user.stories.length - 1) {
            goToNextUser();
        } else {
            setStoryIndex((index) => index + 1);
        }
    };

    useAnimatedReaction(
        () => {
            return progress.value;
        },
        (currentValue, previousValue) => {
            if (currentValue !== previousValue && currentValue === 1) {
                runOnJS(nextStory)();
            }
        },
    );

    useEffect(() => {
        console.log("enter");
        progress.value = withTiming(1, { duration: 5000, easing: Easing.linear });
    }, [storyIndex, userIndex]);

    const container: ViewStyle = {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    };
    const imageStyle: ImageStyle = {
        flex: 1,
        width: "100%",
        height: "100%",
        borderRadius: 12,
    };
    const header: ViewStyle = {
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 10,
        padding: 20,
        paddingTop: 0,
    };
    const username: TextStyle = {
        color: "white",
        fontWeight: "bold",
    };

    const footer: ViewStyle = {
        width: "95%",
        alignSelf: "center",
        margin: 10,
    };
    const inputStyle: ViewStyle = {
        borderWidth: 1,
        borderColor: "grey",
        padding: 10,
        borderRadius: 50,
    };

    const navPressable: ViewStyle = {
        position: "absolute",
        width: "40%",
        height: "100%",
    };

    const indicatorRow: ViewStyle = {
        flexDirection: "row",
        gap: 5,
        marginTop: 10,
        marginBottom: 20,
    };

    const storyContainer: ViewStyle = { flex: 1, width: "100%", height: "100%" };
    return (
        <View style={storyContainer}>
            <Image source={{ uri: story.uri }} style={imageStyle} />
            <Pressable onPress={prevStory} style={navPressable} />
            <Pressable onPress={nextStory} style={[navPressable, { right: 0 }]} />
            <LinearGradient colors={["rgba(0,0,0,0.8)", "transparent"]} style={header}>
                <View style={indicatorRow}>
                    {user.stories.map((eachStory, indicatorIndex) => {
                        console.log("inid", indicatorIndex, storyIndex, progress.value);
                        return (
                            <Indicator
                                key={`${user.userId}${indicatorIndex}`}
                                indicatorIndex={indicatorIndex}
                                progress={progress}
                                storyIndex={storyIndex}
                            />
                        );
                    })}
                </View>
                <Text style={username}>{user.username}</Text>
            </LinearGradient>
            <View style={footer}>
                <TextInput
                    placeholder="Send message"
                    placeholderTextColor="white"
                    style={inputStyle}
                />
            </View>
        </View>
    );
};

export default Igstories;
