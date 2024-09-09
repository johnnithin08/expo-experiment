import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ViewStyle, TextStyle, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { signIn } from "aws-amplify/auth";
import { Link, router } from "expo-router";

interface IUserData {
    email: string;
    password: string;
}

const SignIn = () => {
    const [userData, setUserData] = useState<IUserData>({ email: "", password: "" });

    const handleSignIn = async () => {
        const { isSignedIn } = await signIn({
            username: userData.email,
            password: userData.password,
        });
        if (isSignedIn) {
            router.navigate("/(days)/day9/protected");
        }
    };

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
            <Link href="/(days)/day9/auth/sign-up">Create a new account</Link>
        </SafeAreaView>
    );
};

export default SignIn;
