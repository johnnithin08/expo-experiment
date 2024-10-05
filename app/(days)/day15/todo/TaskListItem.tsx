import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { ViewStyle, Pressable, Text, TextStyle, View, Animated } from "react-native";
import { TTask } from ".";
import { Swipeable } from "react-native-gesture-handler";
import Reanimated, { JumpingTransition } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);
const ReanimatedView = Reanimated.createAnimatedComponent(View);

interface ITaskListItem {
    item: TTask;
    handleSelect: () => void;
    handleDelete: () => void;
}

const RightActions = ({ dragAnimatedValue, handleDelete }) => {
    return (
        <AnimatedView
            style={[
                {
                    backgroundColor: "crimson",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    transform: [
                        {
                            translateX: dragAnimatedValue.interpolate({
                                inputRange: [-40, 0],
                                outputRange: [0, 40],
                                extrapolate: "clamp",
                            }),
                        },
                    ],
                },
            ]}>
            <MaterialCommunityIcons onPress={handleDelete} name="delete" size={24} />
        </AnimatedView>
    );
};

export const TaskListItem: FunctionComponent<ITaskListItem> = ({
    handleSelect,
    handleDelete,
    item,
}: ITaskListItem) => {
    const taskContainer: ViewStyle = {
        padding: 5,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    };
    const taskTitle: TextStyle = {
        fontFamily: "Inter",
        fontSize: 16,
        color: item.isFinished ? "lightgray" : "dimgray",
        textDecorationLine: item.isFinished ? "line-through" : "none",
        flex: 1,
    };
    return (
        <ReanimatedView layout={JumpingTransition}>
            <Swipeable
                renderRightActions={(
                    progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
                    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
                ) => (
                    <RightActions
                        progressAnimatedValue={progressAnimatedValue}
                        dragAnimatedValue={dragAnimatedValue}
                        handleDelete={handleDelete}
                    />
                )}>
                <Pressable onPress={handleSelect} style={taskContainer}>
                    <MaterialCommunityIcons
                        name={
                            item.isFinished
                                ? "checkbox-marked-circle-outline"
                                : "checkbox-blank-circle-outline"
                        }
                        size={24}
                        color={item.isFinished ? "gray" : "dimgray"}
                    />
                    <Text style={taskTitle}>{item.title}</Text>
                </Pressable>
            </Swipeable>
        </ReanimatedView>
    );
};
