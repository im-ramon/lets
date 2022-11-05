import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'
import { DancingScript_400Regular, DancingScript_500Medium, DancingScript_600SemiBold, DancingScript_700Bold } from '@expo-google-fonts/dancing-script'

import 'react-native-gesture-handler';
import { Loading } from './src/components/Views/Loading';
import { THEME } from './src/theme'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import Routes from './src/routes'

import { AuthProvider } from './src/contexts/auth';
import Toast from 'react-native-toast-message';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import consoleFeedback from './src/utils/consoleConfig';
import { api } from './src/services/api';

export default function App() {

    async function registerForPushNotificationsAsync() {
        const userTokenStorage = await AsyncStorage.getItem('@lets:expo_push_token')

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;

            if (token !== userTokenStorage) {
                await AsyncStorage.setItem('@lets:expo_push_token', token)
                consoleFeedback('info', 'registerForPushNotificationsAsync', 'ExponentPushToken gerado: ' + token)

                registerUserTokenForPushNotification(token)

            } else {
                consoleFeedback('info', 'registerForPushNotificationsAsync', 'ExponentPushToken encontrado localmente: ' + userTokenStorage)
            }

        } else {
            alert('Você deve usar o dispositivo físico para notificações push');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

    };

    async function registerUserTokenForPushNotification(token: string) {
        await api.post<{ token: string }>('/push_tokens', {
            exponent_push_token: token
        }).then(response => {
            consoleFeedback('info', 'registerUserTokenForPushNotification', 'Token salvo/ recuperado do servidor: ' + response.data.token)
        }).catch(e => {
            consoleFeedback('error', 'registerUserTokenForPushNotification', e.message)
        })

    }

    useEffect(() => {
        registerForPushNotificationsAsync()
    }, [])

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
                <Toast />
            </AuthProvider>
        </NavigationContainer>
    );
}