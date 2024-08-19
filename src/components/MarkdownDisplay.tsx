import React, { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Markdown from 'react-native-markdown-display';

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



export const MarkdownDisplay = ({children}: PropsWithChildren) => {

    const markdownStyles = StyleSheet.create({
        heading1: {
            fontWeight: "bold",
            fontFamily: "InterBlack",
            marginVertical: 10
        },
        heading2: {
            fontFamily: "InterBold",
            marginVertical: 10
        },
        body: {
            fontSize: 16,
        }
    })
  return (
        <ScrollView style={{padding: 12}}>

        <Markdown style={markdownStyles}>
            {children}
          </Markdown>
        </ScrollView>
  )
}