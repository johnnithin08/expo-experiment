import { Ionicons } from "@expo/vector-icons";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, View, ViewStyle, StyleSheet, TextStyle, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IVideoPost {
    post: {
        id: string;
        video: string;
        caption: string;
    };
    activePost: string;
}

export const VideoPost: FunctionComponent<IVideoPost> = ({ activePost, post }: IVideoPost) => {
    const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus>();
    const videoRef = useRef<Video>(null);
    const isPlaying = videoStatus?.isLoaded && videoStatus.isPlaying;
    const handlePress = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pauseAsync();
            } else {
                videoRef.current.playAsync();
            }
        }
    };

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }
        if (activePost !== post.id) {
            videoRef.current.pauseAsync();
        }
        if (activePost === post.id) {
            videoRef.current.playAsync();
        }
    }, [activePost, videoRef.current]);
    const container: ViewStyle = {
        height: Dimensions.get("screen").height,
    };
    const content: ViewStyle = {
        flex: 1,
        padding: 10,
    };

    const videoStyle: ViewStyle = {
        flex: 1,
    };

    const footer: ViewStyle = {
        marginTop: "auto",
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 20,
    };

    const leftColumn: ViewStyle = {
        flex: 1,
    };
    const rightColumn: ViewStyle = {
        gap: 10,
    };

    const captionStyle: TextStyle = {
        color: "white",
        fontFamily: "Inter",
        fontSize: 18,
    };
    return (
        <View style={container}>
            <Video
                ref={videoRef}
                style={[videoStyle, StyleSheet.absoluteFill]}
                source={{
                    uri: post.video,
                }}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay={false}
                onPlaybackStatusUpdate={setVideoStatus}
            />

            <Pressable onPress={handlePress} style={content}>
                {!isPlaying && (
                    <Ionicons
                        name="play"
                        size={70}
                        color="white"
                        style={{
                            position: "absolute",
                            top: "50%",
                            alignSelf: "center",
                            opacity: 0.7,
                        }}
                    />
                )}
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    style={[StyleSheet.absoluteFillObject, { top: "50%" }]}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={footer}>
                        <View style={leftColumn}>
                            <Text style={captionStyle}>{post.caption}</Text>
                        </View>
                        <View style={rightColumn}>
                            <Ionicons color="white" name="heart" size={30} />
                            <Ionicons color="white" name="share-social-sharp" size={30} />
                            <Ionicons color="white" name="bookmark" size={30} />
                        </View>
                    </View>
                </SafeAreaView>
            </Pressable>
        </View>
    );
};
