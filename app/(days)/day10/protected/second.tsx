import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

const Protected = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Protected Second</Text>
        </SafeAreaView>
    );
};

export default Protected;
