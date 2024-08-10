import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {View, Text, ViewStyle, TextStyle, Pressable, Button, Dimensions} from "react-native"
import { Directions, FlatList, Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { BounceIn, BounceOut, FadeIn, FadeOut, SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const OnboardingSteps = [
    {
    title: "Welcome to Devember",
    description: "Daily react native tutorials during December",
    icon: "snowflake"
    },
    {
    title: "Learn and grow together",
    description: "Learn by building 24 projects with react native and Expo",
    icon: "people-arrows"
    },
    {
    title: "Education for children",
    description: "Contribute to the fund raiser 'Education for Children'.",
    icon: "book-reader"
    },
]

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const {height, width} = Dimensions.get("screen");


    const handleContinue = () => {
        if(currentStep === OnboardingSteps.length - 1)
         {
            endOnBoarding();
         }
        else
         {
            setCurrentStep(currentStep + 1);
         }
    }

    const handleBack = () => {
        if(currentStep === 0)
         {
            endOnBoarding();
         }
        else
         {
            setCurrentStep(currentStep - 1);
         }
    }

    const endOnBoarding = () => {
        setCurrentStep(0);
        router.back();
    }

    const data = OnboardingSteps[currentStep]

    const container: ViewStyle = {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#15141A",
        padding: 20,
        width: width
    }

    const titleStyle: TextStyle = {
        color: "#FDFDFD",
        fontSize: 50,
        fontWeight: "bold",
        fontFamily: "InterBlack",
        letterSpacing: 1.3,
        marginVertical: 20
    }

    const descriptionStyle: TextStyle = {
        color: "grey",
        fontSize: 20,
        fontFamily: "Inter",
        lineHeight: 28
    }

    const iconStyle: ViewStyle = {
        alignSelf: "center",
        margin: 20
    }

    const footerStyle: ViewStyle = {
        marginTop: "auto"
    }

    const buttonsContainer: ViewStyle = {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        gap: 20,
        backgroundColor: "#15141A",
    }

    const buttonStyle: ViewStyle = {
        backgroundColor: "#302E38",
        borderRadius: 20,
        alignItems: "center",
        flex: 1,
        
    }
    
    const buttonText: TextStyle = {
        color: "#FDFDFD",
        fontSize: 18,
        padding: 15,
        paddingHorizontal: 25,
        fontFamily: "InterSemi"

    }
    
    const stepIndicatorContainer: TextStyle = {
        flexDirection: "row",
        gap: 8
    }
    
    const stepIndicator: TextStyle = {
        height: 3, 
        flex: 1,
        borderRadius: 10,
        backgroundColor: "grey",
    }

    const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(handleBack);

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(handleContinue);

    const fling = Gesture.Simultaneous(flingLeft, flingRight)
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#15141A"}}>
        <StatusBar style='light' backgroundColor="#15141A"/>
                            <View style={stepIndicatorContainer}>
                                {OnboardingSteps.map((eachStep, index) => 
                                    (
                                        <View key={index} style={[stepIndicator, {backgroundColor: index === currentStep ? "#CEF202" : "grey"}]}/>
                                    )
                                )}
                            </View>
                            <GestureDetector gesture={fling}>
                        <Animated.View  style={container} key={currentStep} >
                            <Animated.View entering={FadeIn}>
                            <FontAwesome5 name={data.icon} color="#CEF202" size={100} style={iconStyle}/>
                            </Animated.View>
                            <View style={footerStyle}> 

                            <Animated.Text entering={SlideInRight} exiting={SlideOutLeft} style={titleStyle}>{data.title}</Animated.Text>
                            <Animated.Text entering={SlideInRight.delay(200)} exiting={SlideOutLeft.delay(200)} style={descriptionStyle}>{data.description}</Animated.Text>
                            </View>
                        </Animated.View>
                            </GestureDetector>
                            <View style={buttonsContainer}>
                                <Text style={buttonText} onPress={endOnBoarding}>Skip</Text>
                                <Pressable style={buttonStyle} onPress={handleContinue}>
                                    <Text style={buttonText}>Continue</Text>
                                </Pressable>
                            </View>
    </SafeAreaView>
  )
}

export default Onboarding