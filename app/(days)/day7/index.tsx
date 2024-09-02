import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Voice Memo 

Work with Microphone and Audio playback
`;

const Day7 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 7: Voice Memo", headerShown: true }} />
            <Text>Day 7</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button title="Go To Voice App" onPress={() => router.push("/day7/memos")} />
        </SafeAreaView>
    );
};

export default Day7;
