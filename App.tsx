import { StatusBar } from 'react-native'
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'
import { DancingScript_400Regular, DancingScript_500Medium, DancingScript_600SemiBold, DancingScript_700Bold } from '@expo-google-fonts/dancing-script'

import { Loading } from './src/components/Views/Loading'

import { Welcome } from './src/components/Views/Welcome'
import { Home } from './src/components/Views/Home'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AuthRoutes from './src/routes/AuthRoutes'

import { THEME } from './src/theme'

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
        <NavigationContainer
            theme={generalThemeRoutes}
        >

            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            {fontsLoaded ? <AuthRoutes /> : <Loading />}

        </NavigationContainer>
    );
}