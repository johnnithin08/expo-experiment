import { router, Stack } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Day2 = () => {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{ title: "Day 2: Onboarding", headerShown: true }}
      />
      <Text>Day 2</Text>
      <Button
        title="Go To Onboarding"
        onPress={() => router.push("/day2/onboarding")}
      />
    </SafeAreaView>
  );
};

export default Day2;
