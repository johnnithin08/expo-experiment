import { VideoPost } from "@/src/components/VideoPost";
import React, { useCallback, useRef, useState } from "react";
import { View, ViewStyle, FlatList, ViewToken, ViewabilityConfigCallbackPairs } from "react-native";

const dummyPosts = [
    {
        id: "2",
        video: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
        caption: "Caption of the post",
    },
    {
        id: "1",
        video: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4",
        caption: "Hey there",
    },
    {
        id: "3",
        video: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4",
        caption: "Hola",
    },
    {
        id: "4",
        video: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4",
        caption: "Piano practice",
    },
    {
        id: "5",
        video: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4",
        caption: "Hello World!",
    },
];

const Feed = () => {
    const [activePost, setActivePost] = useState<string>(dummyPosts[0].id);

    const viewablilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>([
        {
            viewabilityConfig: { itemVisiblePercentThreshold: 50 },
            onViewableItemsChanged: ({ changed, viewableItems }) => {
                console.log("vie", viewableItems);
                if (viewableItems.length > 0 && viewableItems[0].isViewable) {
                    setActivePost(viewableItems[0].item.id);
                }
            },
        },
    ]);
    const container: ViewStyle = {
        flex: 1,
    };
    return (
        <View style={container}>
            <FlatList
                pagingEnabled
                data={dummyPosts}
                renderItem={({ item, itemIndex }) => {
                    return <VideoPost post={item} activePost={activePost} />;
                }}
                showsVerticalScrollIndicator={false}
                viewabilityConfigCallbackPairs={viewablilityConfigCallbackPairs.current}
            />
        </View>
    );
};

export default Feed;
