import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    useCameraDevice,
    useCameraPermission,
    Camera,
    PhotoFile,
    useMicrophonePermission,
    VideoFile,
    useCodeScanner,
} from "react-native-vision-camera";
import {
    ActivityIndicator,
    Text,
    StyleSheet,
    View,
    Pressable,
    Image,
    Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";

const CameraVision = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [image, setImage] = useState<PhotoFile>();
    const [video, setVideo] = useState<VideoFile>();
    const [mode, setMode] = useState<string>("camera");
    const cameraRef = useRef<Camera>(null);
    const [flash, setFlash] = useState<boolean>(false);
    const { hasPermission, requestPermission } = useCameraPermission();
    const { hasPermission: hasMicPermission, requestPermission: requestMicPermission } =
        useMicrophonePermission();
    const device = useCameraDevice("back", {
        physicalDevices: ["wide-angle-camera"],
    });

    const codeScanner = useCodeScanner({
        codeTypes: ["qr", "ean-13"],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes[0].value} codes!`);
        },
    });

    useFocusEffect(
        useCallback(() => {
            setIsActive(true);
            return () => {
                setIsActive(false);
            };
        }, []),
    );

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
        if (!hasMicPermission) {
            requestMicPermission();
        }
    }, [hasPermission, hasMicPermission]);

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            if (isRecording) {
                cameraRef.current.stopRecording();
                setIsRecording(false);
                return;
            }
            const photo = await cameraRef.current.takePhoto({
                flash: flash ? "on" : "off",
            });
            setImage(photo);
        }
    };

    const handleTakeVideo = async () => {
        if (cameraRef.current) {
            setIsRecording(true);
            const recording = await cameraRef.current.startRecording({
                flash: flash ? "on" : "off",
                onRecordingFinished: (video: VideoFile) => {
                    setVideo(video);
                    console.log(video);
                    setIsRecording(false);
                },
                onRecordingError: (error) => {
                    console.log("err", error);
                    setIsRecording(false);
                },
            });
            console.log("rec", recording);
        }
    };

    const handleClearPhoto = () => {
        setImage(undefined);
    };
    console.log("has", hasPermission);

    if (!hasPermission || !hasMicPermission) {
        return <ActivityIndicator />;
    }

    if (!device) {
        return <Text>No Camera Device</Text>;
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {video && (
                <View
                    style={[
                        {
                            flex: 1,
                        },
                    ]}>
                    <Video
                        style={{
                            flex: 1,
                        }}
                        source={{
                            uri: video.path,
                        }}
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        isLooping
                    />
                </View>
            )}
            {image && (
                <>
                    <Image
                        source={{ uri: `file://'${image.path}` }}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View style={{ zIndex: 100 }}>
                        <FontAwesome5
                            onPress={handleClearPhoto}
                            color="white"
                            name="arrow-left"
                            size={24}
                            style={{ position: "absolute", top: 50, left: 30 }}
                        />
                    </View>
                </>
            )}

            {!image && !video && (
                <>
                    <Pressable
                        style={{
                            position: "absolute",
                            right: 10,
                            top: 50,
                            backgroundColor: "rgba(0,0,0,0.4)",
                            padding: 10,
                            borderRadius: 5,
                            gap: 10,
                            zIndex: 100,
                        }}>
                        <Ionicons
                            onPress={() => setFlash(!flash)}
                            color={flash ? "yellow" : "white"}
                            name={flash ? "flash" : "flash-off"}
                            size={24}
                        />
                        <Ionicons
                            onPress={() => setMode(mode === "qr" ? "camera" : "qr")}
                            color="white"
                            name={mode === "camera" ? "qr-code-sharp" : "camera"}
                            size={30}
                        />
                    </Pressable>
                    <Pressable
                        onLongPress={handleTakeVideo}
                        onPress={handleTakePicture}
                        style={{
                            position: "absolute",
                            alignSelf: "center",
                            bottom: 50,
                            width: 75,
                            height: 75,
                            backgroundColor: isRecording ? "red" : "white",
                            borderRadius: 75,
                            zIndex: 100,
                        }}
                    />
                </>
            )}
            {isActive && mode === "qr" && !image && !video && (
                <Camera
                    isActive={true}
                    codeScanner={codeScanner}
                    device={device}
                    ref={cameraRef}
                    style={StyleSheet.absoluteFill}
                />
            )}
            {isActive && mode === "camera" && !image && !video && (
                <Camera
                    isActive={true}
                    codeScanner={codeScanner}
                    device={device}
                    ref={cameraRef}
                    photo
                    video
                    audio
                    style={StyleSheet.absoluteFill}
                />
            )}
        </SafeAreaView>
    );
};

export default CameraVision;
