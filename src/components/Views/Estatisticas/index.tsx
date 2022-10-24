import { useState } from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { THEME } from '../../../theme'

import { EstatisticasMain } from './Main'
import { Recaidas } from './Recaidas'

const Stack = createStackNavigator();

export function Estatisticas() {
    const generalThemeRoutes = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: THEME.COLORS.BACKGROUND_1,
        },
    }

    return (
        <Stack.Navigator
            initialRouteName='EstatisticasMain'
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}>

            <Stack.Screen name='Main' component={EstatisticasMain} />
            <Stack.Screen
                name='Recaidas'
                component={Recaidas}
                options={{
                    headerShown: true,
                    headerTitle: 'Motivos que te levaram a recair',
                    headerStyle: {
                        backgroundColor: THEME.COLORS.BACKGROUND_1,
                    },
                    headerTintColor: THEME.COLORS.TEXT,
                }}
            />
        </Stack.Navigator>
    );
}