import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# AirBnB Maps

Maps Component
`;

const Day4 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 5: Airbnb Maps", headerShown: true }} />
            <Text>Day 5</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button title="Go To Maps" onPress={() => router.push("/day5/airbnb")} />
        </SafeAreaView>
    );
};

export default Day4;
