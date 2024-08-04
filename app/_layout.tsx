import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts, In } from 'expo-font';
import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { AmaticSC_400Regular, AmaticSC_700Bold} from '@expo-google-fonts/amatic-sc';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    InterBlack: Inter_900Black,
    AmaticRegular: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold 
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{flex: 1}}>
      <Stack  screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" />
      </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
