import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ViewStyle, TextStyle, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { signIn, signUp } from "aws-amplify/auth";
import { Link, router } from "expo-router";

interface IUserData {
    email: string;
    password: string;
}

const SignUp = () => {
    const [userData, setUserData] = useState<IUserData>({ email: "", password: "" });

    const handleSignUp = async () => {
        const { isSignUpComplete } = await signUp({
            username: userData.email,
            password: userData.password,
        });
        if (isSignUpComplete) {
            router.navigate("/(days)/day9/auth/sign-in");
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
            <Text style={titleStyle}>Sign Up</Text>
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
            <Button onPress={handleSignUp} title="Sign Up" />
            <Link href={"/day9/auth/sign-in"}>Already have an account? Sign In</Link>
        </SafeAreaView>
    );
};

export default SignUp;
