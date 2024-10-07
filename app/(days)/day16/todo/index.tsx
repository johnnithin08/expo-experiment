import { NewTaskInput } from "@/src/components/NewTaskInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
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
import { NewTaskInputContext } from "./NewTaskInputContext";
import { TasksContext, TasksContextProvider, useTasks } from "./TasksContextProvider";

const Todo = () => {
    const [search, setSearch] = useState<string>("");
    const [tab, setTab] = useState<"All" | "Todo" | "Finished">("All");
    const headerHeight = useHeaderHeight();
    const { getFilteredTasks } = useTasks();

    const filteredTasks = getFilteredTasks(tab, search);

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
                        marginTop: 100,
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
                        return <TaskListItem item={item} index={index} />;
                    }}
                    ListFooterComponent={<NewTaskInputContext />}
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Todo;
