import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import TinderCard from "./TinderCard";
import {
    interpolate,
    runOnJS,
    useAnimatedReaction,
    useDerivedValue,
    useSharedValue,
    withDecay,
    withSpring,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const dummyUsers: ITinderUser[] = [
    {
        id: 1,
        image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg",
        name: "Dani",
    },
    {
        id: 2,
        image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/2.jpg",
        name: "Jon",
    },
    {
        id: 3,
        image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/3.jpg",
        name: "Nithin",
    },
    {
        id: 4,
        image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/4.jpeg",
        name: "Alice",
    },
    {
        id: 5,
        image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg",
        name: "Ray",
    },
    {
        id: 6,
        image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/6.jpg",
        name: "Kelsey",
    },
];

const Tinder = () => {
    const activeIndex = useSharedValue<number>(0);
    const [index, setIndex] = useState<number>(0);
    const [users, setUsers] = useState<ITinderUser[]>(dummyUsers);

    useAnimatedReaction(
        () => {
            return activeIndex.value;
        },
        (currentValue, oldValue) => {
            if (Math.floor(currentValue) !== index) {
                runOnJS(setIndex)(Math.floor(currentValue));
            }
        },
    );

    useEffect(() => {
        if (index > dummyUsers.length - 3) {
            setUsers((prev) => [...dummyUsers.reverse(), ...prev]);
        }
    }, [index]);
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {dummyUsers.map((eachUser, eachIndex) => {
                return (
                    <TinderCard
                        activeIndex={activeIndex}
                        currentIndex={eachIndex}
                        key={`${eachUser.id}${eachIndex}`}
                        numOfCards={dummyUsers.length}
                        user={eachUser}
                    />
                );
            })}
        </SafeAreaView>
    );
};

export default Tinder;
