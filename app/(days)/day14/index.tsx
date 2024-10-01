import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Tiktok Feed

Video feed similar to tiktok shorts
`;

const Day11 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 14: Notifications", headerShown: true }} />
            <Text>Day 14</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button
                title="Go To Tiktok"
                onPress={() => router.push("/(days)/day14/notifications")}
            />
        </SafeAreaView>
    );
};

export default Day11;
