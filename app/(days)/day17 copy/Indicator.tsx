import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

interface IIndicator {
    indicatorIndex: number;
    progress: SharedValue<number>;
    storyIndex: number;
}

const Indicator: FunctionComponent<IIndicator> = ({ indicatorIndex, progress, storyIndex }) => {
    const indicator: ViewStyle = {
        backgroundColor: "white",
        height: 3,
    };
    const indicatorBG: ViewStyle = {
        backgroundColor: "darkgrey",
        height: 3,
        flex: 1,
        borderRadius: 5,
        overflow: "hidden",
    };

    const indicatorAnimatedStyle = useAnimatedStyle(() => {
        if (indicatorIndex > storyIndex) {
            return { width: "0%" }; // Set width to 0% if this indicator is ahead
        }
        if (indicatorIndex < storyIndex) {
            return { width: "100%" }; // Set width to 100% if this indicator is behind
        }

        // Use progress for the current indicator
        return {
            width: `${progress.value * 100}%`,
        };
    });
    return (
        <View style={indicatorBG}>
            <Animated.View style={[indicator, indicatorAnimatedStyle]} />
        </View>
    );
};

export default Indicator;
