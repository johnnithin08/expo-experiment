import React from "react";
import { View, Text, Button } from "react-native";
import * as ExpoNotifications from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { usePushNotifications } from "@/hooks/usePushNotifications";

const Notifications = () => {
    const { expoPushToken } = usePushNotifications();
    const sendPushNotification = async () => {
        console.log(expoPushToken);
    };
    return (
        <SafeAreaView>
            <View>
                <Text>Notifications</Text>

                <Button
                    title="Press to Send Notification"
                    onPress={async () => {
                        await sendPushNotification();
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Notifications;
