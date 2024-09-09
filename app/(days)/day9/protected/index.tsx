import { signOut } from "aws-amplify/auth";
import React from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Protected = () => {
    return (
        <SafeAreaView>
            <Button onPress={() => signOut()} title="Sign Out" />
            <Text>Protected</Text>
        </SafeAreaView>
    );
};

export default Protected;
