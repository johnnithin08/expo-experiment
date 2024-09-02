import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Weather App

Fetch weather data and display it
`;

const Day8 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 8: Weather App", headerShown: true }} />
            <Text>Day 7</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button title="Go To Weather App" onPress={() => router.push("/day8/weather")} />
        </SafeAreaView>
    );
};

export default Day8;
