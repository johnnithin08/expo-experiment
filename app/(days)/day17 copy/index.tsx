import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# instagram stories

Video feed similar to tiktok shorts
`;

const Day11 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 18: Instagram", headerShown: true }} />
            <Text>Day 18</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button title="Go To IG" onPress={() => router.push("/day18/main")} />
        </SafeAreaView>
    );
};

export default Day11;
