import { Welcome } from '../components/Views/Welcome'

import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../theme'

const Stack = createStackNavigator();

export default function AppRoutes() {
    return (
        <Stack.Navigator
            initialRouteName='Welcome'
            screenOptions={{
                headerShown: false,
            }}>

            <Stack.Screen name='Welcome' component={Welcome} />
        </Stack.Navigator>
    );
}