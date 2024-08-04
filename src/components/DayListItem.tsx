import { Inter_900Black } from '@expo-google-fonts/inter';
import { Href, Link,  } from 'expo-router';
import React, { FunctionComponent } from 'react'
import { ViewStyle, TextStyle, View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'

interface IDayListItem {
    day: number;
}

export const DayListItem: FunctionComponent<IDayListItem> = ({day}: IDayListItem) => {
    const {width} = Dimensions.get("screen");
    const boxContainer: ViewStyle = {
        flex: 1,
        maxWidth: width * 0.45,
        // width: width * 0.2,
        aspectRatio: 1,
        backgroundColor: "#f9ede3",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#9b4521",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    }
    const textStyle: TextStyle = {
        color: "#9b4521",
        fontSize: 70,
        fontFamily: 'InterBlack'
    }
    const hrefString:Href<string> = `/day${day}` as Href<string>
  return (
    <Link href={hrefString} asChild>
    <Pressable style={boxContainer}>
                    <Text style={textStyle}>{day}</Text>
                </Pressable>
    </Link>
  )
}

