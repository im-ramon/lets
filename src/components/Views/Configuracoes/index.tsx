import { createStackNavigator } from '@react-navigation/stack';

import { THEME } from '../../../theme'

import { Main } from './Main'
import { MeusDados } from './MeusDados'

const Stack = createStackNavigator();

export default function Configuracoes() {
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