import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { useFonts, In } from 'expo-font';
import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_900Black,
    useFonts,
} from "@expo-google-fonts/inter";
import { AmaticSC_400Regular, AmaticSC_700Bold } from "@expo-google-fonts/amatic-sc";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { View, ViewStyle } from "react-native";
import Animated, {
    BounceInDown,
    BounceInRight,
    BounceInUp,
    FadeIn,
    FadeOut,
    PinwheelOut,
    SlideOutLeft,
    SlideOutUp,
    ZoomOut,
} from "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function RootLayout() {
    const [appReady, setAppReady] = useState<boolean>(false);
    const [animationFinish, setAnimationFinish] = useState<boolean>(false);
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        InterBlack: Inter_900Black,
        InterSemi: Inter_600SemiBold,
        Inter: Inter_400Regular,
        AmaticRegular: AmaticSC_400Regular,
        AmaticBold: AmaticSC_700Bold,
    });

    useEffect(() => {
        if (loaded) {
            setAppReady(true);
            // SplashScreen.hideAsync();
        }
    }, [loaded]);

    const showSplashScreen = !appReady || !animationFinish;

    const splashScreenContainer: ViewStyle = {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    };

    if (showSplashScreen) {
        return (
            <Animated.View style={splashScreenContainer}>
                <AnimatedLottieView
                    entering={FadeIn}
                    autoPlay
                    loop={false}
                    onAnimationFinish={() => setAnimationFinish(true)}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    source={require("@assets/netflix-lottie.json")}
                />
            </Animated.View>
        );
    }

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Animated.View style={{ flex: 1 }} entering={FadeIn}>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="index" />
                    </Stack>
                </Animated.View>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
