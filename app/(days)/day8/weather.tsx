import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    ActivityIndicator,
    Text,
    TextStyle,
    View,
    ViewStyle,
    ImageBackground,
    StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { FlatList } from "react-native-gesture-handler";
import { ForecastItem } from "@/src/components/ForecastItem";
import LottieView from "lottie-react-native";

const baseUrl = `https://api.openweathermap.org/data/2.5`;
const apiKey = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;
const bgImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg";

const Weather = () => {
    const [weather, setWeather] = useState<TWeatherData>();
    const [forecast, setForecast] = useState<TWeatherForecast[]>();
    const [location, setLocation] = useState<Location.LocationObject>();
    const [errorMsg, setErrorMsg] = useState<string>();

    const fetchLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };
    const fetchWeather = async () => {
        const response = await fetch(
            `${baseUrl}/weather?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&exclude={part}&appid=${apiKey}&units=metric`,
        );
        const data = await response.json();
        // console.log(data);
        setWeather(data);
    };
    const fetchForecast = async () => {
        const response = await fetch(
            `${baseUrl}/forecast?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${apiKey}&units=metric`,
        );
        const data = await response.json();
        setForecast(data.list);
    };

    useEffect(() => {
        if (location) {
            fetchWeather();
            fetchForecast();
        }
    }, [location]);

    useEffect(() => {
        fetchLocation();
    }, []);

    if (!weather) {
        return <ActivityIndicator size={"large"} />;
    }
    const containerStyle: ViewStyle = {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    };
    const locationStyle: TextStyle = {
        fontFamily: "InterSemi",
        fontSize: 40,
        color: "lightgrey",
    };
    const temp: TextStyle = {
        fontFamily: "InterBlack",
        fontSize: 100,
        color: "#FEFEFE",
    };
    const overlay: ViewStyle = {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
    };

    console.log("we", weather);
    const checkSunny =
        weather.weather[0].main !== "Sunny"
            ? require("@assets/cloudy-lottie.json")
            : require("@assets/sunny-lottie.json");
    const checkRainy =
        weather.weather[0].main === "Rain" ? require("@assets/rain-lottie.json") : checkSunny;
    return (
        <ImageBackground source={{ uri: bgImage }} style={containerStyle}>
            <View style={overlay} />
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <LottieView
                    autoPlay
                    loop
                    style={{
                        width: 200,
                        aspectRatio: 1,
                        // backgroundColor: "#eee",
                    }}
                    source={checkRainy}
                />
                <Text style={locationStyle}>{weather.name}</Text>
                <Text style={temp}>{Math.round(weather.main.temp)}°</Text>
            </View>
            <View style={{ maxHeight: 250 }}>
                <FlatList
                    data={forecast}
                    horizontal
                    contentContainerStyle={{
                        gap: 10,
                        paddingHorizontal: 10,
                    }}
                    style={{ flexGrow: 0, marginBottom: 15, height: 200 }}
                    renderItem={({ item, index }) => {
                        return <ForecastItem item={item} />;
                    }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ImageBackground>
    );
};

export default Weather;
