import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Camera App

Take photos and record videos with vision camera
`;

const Day11 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 11: Camera", headerShown: true }} />
            <Text>Day 11</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button title="Go To Camera" onPress={() => router.push("/day11/camera")} />
        </SafeAreaView>
    );
};

export default Day11;
