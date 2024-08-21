import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Markdown

Animated Splash Screen
`;

const Day4 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 4: Splashscreen", headerShown: true }} />
            <Text>Day 4</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button title="Go To Animation" onPress={() => router.push("/day4/animation")} />
        </SafeAreaView>
    );
};

export default Day4;
