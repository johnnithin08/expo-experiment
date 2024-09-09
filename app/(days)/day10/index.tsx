import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Biometrics

Fingerprint and FaceID
`;

const Day8 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 10: Biometrics", headerShown: true }} />
            <Text>Day 10</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button title="Go To Auth" onPress={() => router.push("/day10/protected")} />
        </SafeAreaView>
    );
};

export default Day8;
