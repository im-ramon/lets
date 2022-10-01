import { Welcome } from '../components/Views/Welcome'
import { Singin } from '../components/Views/Auth/SingIn';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppRoutes() {
    return (
        <Stack.Navigator
            initialRouteName='Singin'
            // initialRouteName='Welcome'
            screenOptions={{
                headerShown: false,
            }}>

            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Login' component={Singin} />
        </Stack.Navigator>
    );
}