import { Slot } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useBiometrics } from "@/src/components/BiometricProvider";

const ProtectedLayout = () => {
    const { isUnlocked, authenticate } = useBiometrics();

    useEffect(() => {
        if (!isUnlocked) {
            authenticate();
        }
    }, []);

    if (!isUnlocked) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Use Biometric to unlock</Text>
                <FontAwesome5 onPress={authenticate} name="fingerprint" size={24} />
            </SafeAreaView>
        );
    }

    return <Slot />;
};

export default ProtectedLayout;
