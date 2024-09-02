import dayjs from "dayjs";
import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";
import { BlurView } from "expo-blur";
import LottieView from "lottie-react-native";

interface IForecastItemProps {
    item: TWeatherForecast;
}

export const ForecastItem = ({ item }: IForecastItemProps) => {
    const container: ViewStyle = {
        padding: 10,
        aspectRatio: 9 / 16,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    };
    const temp: TextStyle = {
        fontFamily: "InterBlack",
        fontSize: 35,
        color: "white",
        marginVertical: 10,
    };

    const dateStyle: TextStyle = {
        fontFamily: "Inter",
        color: "ghostwhite",
        fontSize: 16,
    };
    const checkSunny =
        item.weather[0].main === "Clouds"
            ? require("@assets/cloudy-lottie.json")
            : require("@assets/sunny-lottie.json");
    const checkRainy =
        item.weather[0].main === "Rain" ? require("@assets/rain-lottie.json") : checkSunny;
    return (
        <BlurView intensity={30} style={container}>
            <LottieView
                autoPlay
                loop
                style={{
                    width: 100,
                    aspectRatio: 1,
                    // backgroundColor: "#eee",
                }}
                source={checkRainy}
            />
            <Text style={temp}>{Math.round(item.main.temp)}°</Text>
            <Text style={dateStyle}>{dayjs(item.dt * 1000).format("ddd ha")}</Text>
        </BlurView>
    );
};
