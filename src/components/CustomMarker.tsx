import { Text, View, ViewStyle } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface ICustomMarker {
    apartment: IApartment;
    handleSelect: () => void;
}

export const CustomMarker = ({ apartment, handleSelect }: ICustomMarker) => {
    const { lat, long, price } = apartment;
    return (
        <Marker coordinate={{ latitude: lat, longitude: long }} onPress={handleSelect}>
            <View
                style={{
                    backgroundColor: "white",
                    padding: 3,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "grey",
                }}>
                <Text style={{ fontFamily: "InterSemi" }}>$ {price}</Text>
            </View>
        </Marker>
    );
};
