import { StatusBar  } from 'react-native'
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'
import { DancingScript_400Regular, DancingScript_500Medium, DancingScript_600SemiBold, DancingScript_700Bold } from '@expo-google-fonts/dancing-script'
import { Background } from './src/components/parts/Background'
import { Loading } from './src/components/Views/Loading'

import { Welcome } from './src/components/Views/Welcome'
import { Home } from './src/components/Views/Home'

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

    return (
        <Background>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            {fontsLoaded ? <Home /> : <Loading />}
        </Background>
    );
}