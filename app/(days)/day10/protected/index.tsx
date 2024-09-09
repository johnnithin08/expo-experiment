import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { Link } from "expo-router";

const Protected = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Protected</Text>
            <Link href={"/day10/protected/second"}>Next page</Link>
        </SafeAreaView>
    );
};

export default Protected;
