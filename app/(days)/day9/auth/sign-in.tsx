import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ViewStyle, TextStyle, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface IUserData {
    email: string;
    password: string;
}

const SignIn = () => {
    const [userData, setUserData] = useState<IUserData>({ email: "", password: "" });

    const handleSignIn = () => {};

    const containerStyle: ViewStyle = {
        flex: 1,
        justifyContent: "center",
        padding: 10,
    };

    const titleStyle: TextStyle = {
        fontFamily: "InterSemi",
        fontSize: 24,
        color: "grey",
    };

    const inputStyle: ViewStyle = {
        borderWidth: 1,
        borderColor: "gainsboro",
        padding: 10,
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius: 5,
    };
    return (
        <SafeAreaView style={containerStyle}>
            <Text style={titleStyle}>Sign In</Text>
            <TextInput
                onChangeText={(email) => setUserData({ ...userData, email })}
                placeholder="Email"
                style={inputStyle}
            />
            <TextInput
                secureTextEntry
                onChangeText={(password) => setUserData({ ...userData, password })}
                style={inputStyle}
            />
            <Button onPress={handleSignIn} title="Sign In" />
        </SafeAreaView>
    );
};

export default SignIn;
