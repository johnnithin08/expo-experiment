import { LinearGradient } from "expo-linear-gradient";
import React, { FunctionComponent } from "react";
import {
    Dimensions,
    ViewStyle,
    ImageStyle,
    TextStyle,
    View,
    StyleSheet,
    Image,
    Text,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

interface ITinderCard {
    activeIndex: SharedValue<number>;
    user: ITinderUser;
    numOfCards: number;
    currentIndex: number;
}

const TinderCard: FunctionComponent<ITinderCard> = ({
    activeIndex,
    currentIndex,
    numOfCards,
    user,
}: ITinderCard) => {
    const translationX = useSharedValue<number>(0);
    const { width } = Dimensions.get("screen");

    const animatedCard = useAnimatedStyle(() => ({
        opacity: interpolate(
            activeIndex.value,
            [currentIndex - 1, currentIndex, currentIndex + 1],
            [1 - 1 / 5, 1, 1],
        ),
        transform: [
            {
                scale: interpolate(
                    activeIndex.value,
                    [currentIndex - 1, currentIndex, currentIndex + 1],
                    [0.95, 1, 1],
                ),
            },
            {
                translateY: interpolate(
                    activeIndex.value,
                    [currentIndex - 1, currentIndex, currentIndex + 1],
                    [-30, 0, 0],
                ),
            },
            {
                translateX: translationX.value,
            },
            {
                rotateZ: `${interpolate(translationX.value, [-width / 2, 0, width / 2], [-15, 0, 15])}deg`,
            },
        ],
    }));

    const cardStyle: ViewStyle = {
        width: width * 0.8,
        aspectRatio: 1 / 1.67,
        justifyContent: "flex-end",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        position: "absolute",
        zIndex: numOfCards - currentIndex,
    };
    const imageStyle: ImageStyle = {
        ...StyleSheet.absoluteFillObject,
        overflow: "hidden",
        // width: width * 0.8,
        // height: width * 1.67,
        borderRadius: 12,
    };

    const contentContainer: ViewStyle = {
        padding: 10,
    };

    const nameStyle: TextStyle = {
        fontFamily: "InterBlack",
        color: "white",
        fontSize: 24,
    };

    const linearGradientStyle: ViewStyle = {
        ...StyleSheet.absoluteFillObject,
        top: "50%",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    };

    const gesture = Gesture.Pan()
        // .enabled(activeIndex.value -)
        .onChange((e) => {
            translationX.value = e.translationX;
            activeIndex.value = interpolate(
                Math.abs(translationX.value),
                [0, 800],
                [currentIndex, currentIndex + 0.8],
            );
        })
        .onEnd((event) => {
            if (Math.abs(event.velocityX) > 400) {
                translationX.value = withSpring(Math.sign(event.velocityX) * 800, {
                    velocity: event.velocityX,
                });
                activeIndex.value = currentIndex + 1;
            } else {
                translationX.value = withSpring(0);
            }
        });
    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[cardStyle, animatedCard]}>
                <Image source={{ uri: user.image }} style={imageStyle} />
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    style={linearGradientStyle}
                />
                <View style={contentContainer}>
                    <Text style={nameStyle}>{user.name}</Text>
                </View>
            </Animated.View>
        </GestureDetector>
    );
};

export default TinderCard;
