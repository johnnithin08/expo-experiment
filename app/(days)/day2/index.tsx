import { Link, router } from 'expo-router'
import React from 'react'
import { View, Text, Button, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Day2 = () => {
  return (
    <SafeAreaView>
        <Text>Day 2</Text>
        <Button title='Go To Onboarding' onPress={() => router.push("/day2/onboarding")}/>
    </SafeAreaView>
  )
}

export default Day2