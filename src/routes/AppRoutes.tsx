import { Welcome } from '../components/Views/Welcome'
import { SingIn } from '../components/Views/Auth/SingIn';
import { SingUp } from '../components/Views/Auth/SingUp';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppRoutes() {
    return (
        <Stack.Navigator
            initialRouteName='Welcome'
            // initialRouteName='Welcome'
            screenOptions={{
                headerShown: false,
            }}>

            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='SingIn' component={SingIn} />
            <Stack.Screen name='SingUp' component={SingUp} />
        </Stack.Navigator>
    );
}