import React, { useState } from "react";
import { View, Text, ScrollView, ViewStyle, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MarkdownDisplay } from "@/src/components/MarkdownDisplay";

const copy = `# Welcome to My Project

![Project Logo](https://via.placeholder.com/150)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)
7. [Contact](#contact)

## Introduction

Welcome to **My Project**! This project is designed to solve common problems in a unique way. It's built using the latest technologies and aims to be simple and efficient.

## Features

- **Feature 1:** Description of feature 1.
- **Feature 2:** Description of feature 2.
- **Feature 3:** Description of feature 3.
- **Feature 4:** Description of feature 4.
- **Feature 5:** Description of feature 5.

## Installation

To get started with this project, clone the repository and install the dependencies:

\`\`\`bash
git clone https://github.com/username/my-project.git
cd my-project
npm install
\`\`\`
`;

const Editor = () => {
    const [content, setContent] = useState<string>(copy);
    const [tab, setTab] = useState<"edit" | "preview">("edit");

    const tabsContainer: ViewStyle = {
        flexDirection: "row",
        gap: 10,
        margin: 10,
    };

    const tabContainer: ViewStyle = {
        padding: 10,
        flex: 1,
        borderColor: "grey",
        borderWidth: 1,
        alignItems: "center",
        borderRadius: 10,
    };
    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <View style={tabsContainer}>
                <Pressable
                    onPress={() => setTab("edit")}
                    style={[tabContainer, { backgroundColor: tab === "edit" ? "white" : "grey" }]}>
                    <Text style={{ fontFamily: "InterBold" }}>Edit</Text>
                </Pressable>
                <Pressable
                    onPress={() => setTab("preview")}
                    style={[tabContainer, { backgroundColor: tab === "edit" ? "grey" : "white" }]}>
                    <Text style={{ fontFamily: "InterBold" }}>Preview</Text>
                </Pressable>
            </View>
            {tab === "edit" ? (
                <TextInput
                    multiline
                    onChangeText={setContent}
                    style={{
                        flex: 1,
                        padding: 20,
                        fontSize: 16,
                        backgroundColor: "whitesmoke",
                    }}
                    value={content}
                />
            ) : (
                <ScrollView style={{ padding: 12, flex: 1 }}>
                    <MarkdownDisplay>{content}</MarkdownDisplay>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default Editor;
