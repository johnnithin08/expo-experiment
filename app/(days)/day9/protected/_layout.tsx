import { Slot } from "expo-router";
import React from "react";
import { Authenticator, useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react-native";

const ProtectedLayout = () => {
    return <Slot />;
};

export default withAuthenticator(ProtectedLayout);
