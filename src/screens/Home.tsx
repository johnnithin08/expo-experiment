import {Dimensions, Text, View, ViewStyle, StyleSheet, TextStyle} from "react-native"
import { FlatList } from "react-native-gesture-handler";
import { DayListItem } from "../components/DayListItem";

export const Home = () => {

    const container: ViewStyle = {
        flex: 1, 
        padding: 12,
        gap: 12,
        
    }
    const days = [...Array(24)].map((val, index) => index + 1);
    return (
        <View style={container}>

            <FlatList  data={days} renderItem={({item}) => {
                return (

                <DayListItem day={item} />
                )
            }}
            contentContainerStyle={{gap: 12}}
            numColumns={2}
            columnWrapperStyle={{gap: 12}}
            showsVerticalScrollIndicator={false}
            />
        </View>
    )
}