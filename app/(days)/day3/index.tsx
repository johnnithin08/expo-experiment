import { MarkdownDisplay } from '@/src/components/MarkdownDisplay';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const description = `
# Markdown

Integrate Markdown content in **React Native**
`;

const Day3 = () => {
	return (
		<SafeAreaView>
			<Stack.Screen options={{ title: 'Day 3: Markdown', headerShown: true }} />
			<Text>Day 3</Text>
			<MarkdownDisplay>{description}</MarkdownDisplay>
			<Button title="Go To Editor" onPress={() => router.push('/day3/editor')} />
		</SafeAreaView>
	);
};

export default Day3;
