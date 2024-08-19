import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Day1 = () => {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Day 1", headerShown: true }} />
      <Text>Day 1</Text>
    </SafeAreaView>
  );
};

export default Day1;
