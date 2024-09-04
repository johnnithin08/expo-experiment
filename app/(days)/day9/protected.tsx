import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Protected = () => {
    return (
        <SafeAreaView>
            <Text>Protected</Text>
        </SafeAreaView>
    );
};

export default Protected;
