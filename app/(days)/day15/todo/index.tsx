import { NewTaskInput } from "@/src/components/NewTaskInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    View,
    Text,
    ViewStyle,
    FlatList,
    TextStyle,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskListItem } from "./TaskListItem";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

export type TTask = {
    title: string;
    isFinished: boolean;
};

const dummyTasks: TTask[] = [
    {
        title: "Setup Day 15 structure",
        isFinished: true,
    },
    {
        title: "Render a list of tasks",
        isFinished: false,
    },
    {
        title: "Add a new task",
        isFinished: false,
    },
    {
        title: "Cahnge status of task",
        isFinished: false,
    },
    {
        title: "Separate in 2 tabs",
        isFinished: false,
    },
];

const Todo = () => {
    const [tasks, setTasks] = useState<TTask[]>(dummyTasks);
    const [search, setSearch] = useState<string>("");
    const [tab, setTab] = useState<"All" | "Todo" | "Finished">("All");
    const headerHeight = useHeaderHeight();

    const filteredTasks = tasks.filter((eachTask) => {
        if (eachTask.isFinished && tab === "Todo") {
            return false;
        }
        if (!eachTask.isFinished && tab === "Finished") {
            return false;
        }
        if (!search) {
            return true;
        }
        return eachTask.title.toLowerCase().trim().includes(search.toLowerCase());
    });

    const handleAddTask = (newTask: string) => {
        const updatedTasks = [...tasks];
        updatedTasks.push({ title: newTask, isFinished: false });
        setTasks(updatedTasks);
    };

    const page: ViewStyle = {
        backgroundColor: "white",
        flex: 1,
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}>
            <SafeAreaView style={page}>
                <Stack.Screen
                    options={{
                        title: "Todo",
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerSearchBarOptions: {
                            hideWhenScrolling: true,
                            onChangeText: (e) => setSearch(e.nativeEvent.text),
                        },
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        margin: 10,
                        gap: 10,
                        justifyContent: "space-around",
                    }}>
                    <Button onPress={() => setTab("All")} title="All" />
                    <Button onPress={() => setTab("Todo")} title="Todo" />
                    <Button onPress={() => setTab("Finished")} title="Finished" />
                </View>
                <FlatList
                    data={filteredTasks}
                    keyExtractor={(item) => item.title}
                    contentContainerStyle={{ gap: 10, padding: 10 }}
                    renderItem={({ item, index }) => {
                        const handleSelect = () => {
                            const updatedTasks = [...tasks];
                            updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
                            setTasks(updatedTasks);
                        };
                        const handleDelete = () => {
                            const updatedTasks = [...tasks];
                            updatedTasks.splice(index, 1);
                            setTasks(updatedTasks);
                        };

                        return (
                            <TaskListItem
                                item={item}
                                handleDelete={handleDelete}
                                handleSelect={handleSelect}
                            />
                        );
                    }}
                    ListFooterComponent={<NewTaskInput handleAddTask={handleAddTask} />}
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Todo;
