import { createStackNavigator } from '@react-navigation/stack';

import { THEME } from '../../../theme'

import { EstatisticasMain } from './Main'
import { Recaidas } from './Recaidas'

const Stack = createStackNavigator();

export function Estatisticas() {
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