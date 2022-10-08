import React, { useContext } from 'react'
import { StatusBar } from 'react-native'
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'
import { DancingScript_400Regular, DancingScript_500Medium, DancingScript_600SemiBold, DancingScript_700Bold } from '@expo-google-fonts/dancing-script'

import 'react-native-gesture-handler';
import { Loading } from './src/components/Views/Loading';
import { THEME } from './src/theme'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import Routes from './src/routes'

import { AuthProvider } from './src/contexts/auth';

export default function App() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_900Black,
        DancingScript_400Regular,
        DancingScript_500Medium,
        DancingScript_600SemiBold,
        DancingScript_700Bold
    })

    const generalThemeRoutes = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: THEME.COLORS.BACKGROUND_1,
        },
    }

    return (
        <NavigationContainer theme={generalThemeRoutes} >
            <AuthProvider>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                {fontsLoaded ? <Routes /> : <Loading />}
            </AuthProvider>
        </NavigationContainer>
    );
}