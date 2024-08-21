import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { Button } from "react-native";

const Animation = () => {
    const animation = useRef<LottieView>(null);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#eee",
                }}
                source={require("@assets/netflix-lottie.json")}
            />
            <Button title="Play" onPress={() => animation.current?.play()} />
        </SafeAreaView>
    );
};

export default Animation;
