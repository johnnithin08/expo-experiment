/* eslint-disable import/no-unresolved */
import React, { useCallback, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet, { BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet";
// eslint-disable-next-line import/no-unresolved
import apartments from "@assets/data/day5/apartments.json";
import { CustomMarker } from "@/src/components/CustomMarker";
import { ApartmentListItem } from "@/src/components/ApartmentListItem";
import { FlatList } from "react-native-gesture-handler";

const initalRegion = {
    latitude: 51.464153,
    latitudeDelta: 0.05,
    longitude: -2.61258,
    longitudeDelta: 0.05,
};

const Airbnb = () => {
    const [selectedApartment, setSelectedApartment] = useState<IApartment | undefined>();
    const [region, setRegion] = useState(initalRegion);
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    const mapStyle: ViewStyle = {
        width: "100%",
        height: "100%",
    };

    const initialSnapPoints = useMemo(() => [70, "25%", "50%", "75%", "90%"], []);
    const absoluteContainer: ViewStyle = {
        position: "absolute",
        bottom: (initialSnapPoints[0] as number) + 10,
        left: 10,
        right: 10,
    };
    const listTitleStyle: TextStyle = {
        textAlign: "center",
        fontFamily: "InterSemi",
        fontSize: 16,
        marginBottom: 20,
    };
    return (
        <SafeAreaView>
            <MapView style={mapStyle} region={region}>
                {apartments.map((eachApartment, index) => {
                    const handleSelect = () => {
                        setSelectedApartment(eachApartment);
                    };
                    return (
                        <CustomMarker
                            key={eachApartment.id}
                            apartment={eachApartment}
                            handleSelect={handleSelect}
                        />
                    );
                })}
            </MapView>
            {selectedApartment && (
                <ApartmentListItem
                    apartment={selectedApartment}
                    containerStyle={absoluteContainer}
                />
            )}
            <BottomSheet
                index={0}
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={initialSnapPoints}>
                <BottomSheetView style={{ flex: 1 }}>
                    <Text style={listTitleStyle}>Over {apartments.length} places</Text>
                    <FlatList
                        data={apartments}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ gap: 10, padding: 10 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return <ApartmentListItem apartment={item} />;
                        }}
                    />
                </BottomSheetView>
            </BottomSheet>
        </SafeAreaView>
    );
};
export default Airbnb;
