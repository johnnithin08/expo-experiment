import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Todo app with Zustand

Video feed similar to tiktok shorts
`;

const Day11 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 17: Zustand", headerShown: true }} />
            <Text>Day 17</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button title="Go To Context" onPress={() => router.push("/day17/todo")} />
        </SafeAreaView>
    );
};

export default Day11;
