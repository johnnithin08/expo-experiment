import React from "react";
import { Button, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Igstories from "./Igstories";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { IGStories } from "./stories";

const pages = ["#E1F3FA", "#308D46", "red", "yellow"];

const width = 200;
const AnimatedPage = ({ pageColor, pageIndex, index, children }) => {
    const anim = useAnimatedStyle(() => ({
        transform: [
            {
                perspective: width * 2,
            },
            {
                rotateY: `${interpolate(pageIndex.value, [index - 1, index, index + 1], [-90, 0, 90])}deg`,
            },
        ],
    }));

    return (
        <Animated.View
            style={[
                {
                    width: "100%",
                    height: "100%",
                    // aspectRatio: 9 / 16,
                    backgroundColor: pageColor,
                    position: "absolute",
                    borderRadius: 10,
                    zIndex: 100 - index,
                    transformOrigin: ["50%", "50%", -width / 2],
                },
                anim,
            ]}>
            {children}
        </Animated.View>
    );
};

const main = () => {
    const container: ViewStyle = {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    };
    const pageIndex = useSharedValue(0);

    const nextPage = () => {
        pageIndex.value = withTiming(Math.floor(pageIndex.value + 1), { duration: 1000 });
    };

    const prevPage = () => {
        pageIndex.value = withTiming(Math.floor(pageIndex.value - 1), { duration: 1000 });
    };
    return (
        <SafeAreaView style={container}>
            <Igstories />
            {/* {IGStories.map((page, index) => (
                <AnimatedPage key={index} pageColor={page} pageIndex={pageIndex} index={index} >

                    </AnimatedPage>
            ))} */}
            {/* <View style={{ position: "absolute", bottom: 50, zIndex: 1000 }}>
                <Button title="Next" onPress={nextPage} />
                <Button title="Previous" onPress={prevPage} />
            </View> */}
            <StatusBar style="light" />
        </SafeAreaView>
    );
};

export default main;
