import { Redirect, router, Slot } from "expo-router";
import React from "react";
import { Authenticator, useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react-native";

const AuthLayout = () => {
    const { authStatus } = useAuthenticator((context) => [context.authStatus]);
    if (authStatus === "authenticated") {
        return <Redirect href="/(days)/day9/protected" />;
    }
    return <Slot />;
};

export default AuthLayout;
