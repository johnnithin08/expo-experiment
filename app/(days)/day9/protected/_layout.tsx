import { Redirect, router, Slot } from "expo-router";
import React from "react";
import { Authenticator, useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react-native";

const ProtectedLayout = () => {
    const { authStatus } = useAuthenticator((context) => [context.authStatus]);
    if (authStatus === "unauthenticated") {
        return <Redirect href="/(days)/day9/auth/sign-in" />;
    }
    return <Slot />;
};

export default ProtectedLayout;
