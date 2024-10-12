import { Slot, Stack } from "expo-router";
import React from "react";
import { TasksContextProvider } from "./TasksContextProvider";

const TodoLayout = () => {
    return (
        <TasksContextProvider>
            <Stack />
        </TasksContextProvider>
    );
};

export default TodoLayout;
