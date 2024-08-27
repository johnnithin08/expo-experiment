import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Tinder 

Tinder Swipe Animation
`;

const Day6 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 6: Tinder", headerShown: true }} />
            <Text>Day 6</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button title="Go To Tinder" onPress={() => router.push("/day6/tinder")} />
        </SafeAreaView>
    );
};

export default Day6;
