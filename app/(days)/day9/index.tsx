import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Authentication

AWS Amplify Auth
`;

const Day8 = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: "Day 9: AWS Auth", headerShown: true }} />
            <Text>Day 9</Text>
            <MarkdownDisplay>{description}</MarkdownDisplay>
            <Button title="Go To Protected" onPress={() => router.push("/day9/protected")} />
            {/* <Button title="Go To Sign In" onPress={() => router.push("/day9/auth/sign-in")} /> */}
        </SafeAreaView>
    );
};

export default Day8;
