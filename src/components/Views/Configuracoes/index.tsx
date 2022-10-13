import { useState } from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { THEME } from '../../../theme'

import { Main } from './Main'
import { MeusDados } from './MeusDados'

const Stack = createStackNavigator();

export default function Configuracoes() {
    const generalThemeRoutes = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: THEME.COLORS.BACKGROUND_1,
        },
    }

    return (
        <Stack.Navigator
            initialRouteName='Main'
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}>

            <Stack.Screen name='Main' component={Main} />
            <Stack.Screen
                name='MeusDados'
                component={MeusDados}
                options={{
                    headerShown: true,
                    headerTitle: 'Meus dados',
                    headerStyle: {
                        backgroundColor: THEME.COLORS.BACKGROUND_1,
                    },
                    headerTintColor: THEME.COLORS.TEXT,
                }}
            />
        </Stack.Navigator>
    );
}