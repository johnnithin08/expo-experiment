import React from "react";
import { View, Text, ViewStyle, TextStyle, Image, ImageStyle } from "react-native";

interface IApartmentListItem {
    apartment: IApartment;
    containerStyle?: ViewStyle;
}

export const ApartmentListItem = ({ apartment, containerStyle }: IApartmentListItem) => {
    const { title, image, price, rating, description } = apartment;

    const cardContainer: ViewStyle = {
        backgroundColor: "white",
        flexDirection: "row",
        borderRadius: 12,
        overflow: "hidden",
        ...containerStyle,
    };

    const imageContainer: ImageStyle = {
        width: 150,
        aspectRatio: 1,
    };

    const titleStyle: TextStyle = {
        fontFamily: "InterBlack",
        fontSize: 16,
    };

    const rightContainer: ViewStyle = {
        padding: 10,
        flex: 1,
    };
    const priceTextStyle: TextStyle = {
        fontFamily: "InterBlack",
    };
    const footer: ViewStyle = {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    };
    return (
        <View style={cardContainer}>
            <Image source={{ uri: image }} style={imageContainer} />
            <View style={rightContainer}>
                <Text style={titleStyle}>{title}</Text>
                <Text style={{ fontFamily: "Inter" }}>{description}</Text>
                <View style={{ flex: 1 }} />
                <View style={footer}>
                    <Text style={priceTextStyle}>$ {price}</Text>
                    <Text style={priceTextStyle}>★ {rating}(5)</Text>
                </View>
            </View>
        </View>
    );
};
