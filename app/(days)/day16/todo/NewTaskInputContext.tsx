import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FunctionComponent, useState } from "react";
import { ViewStyle, TextStyle, View, TextInput } from "react-native";
import { useTasks } from "./TasksContextProvider";

interface INewTaskInput {}

export const NewTaskInputContext: FunctionComponent<INewTaskInput> = ({}: INewTaskInput) => {
    const { onAddTask } = useTasks();
    const [newTask, setNewTask] = useState<string>("");
    const taskContainer: ViewStyle = {
        padding: 5,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    };
    const inputStyle: TextStyle = {
        fontFamily: "Inter",
        fontSize: 16,
        color: "dimgray",
        flex: 1,
    };
    return (
        <View style={taskContainer}>
            <MaterialCommunityIcons
                name={"checkbox-blank-circle-outline"}
                size={24}
                color="dimgray"
            />
            <TextInput
                onChangeText={setNewTask}
                value={newTask}
                placeholder="Todo"
                style={inputStyle}
                onEndEditing={() => {
                    if (newTask) {
                        onAddTask(newTask);
                        setNewTask("");
                    }
                }}
            />
        </View>
    );
};
