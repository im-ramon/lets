import { useState } from 'react';
import { SingIn } from '../components/Views/Auth/SingIn';
import { SingUp } from '../components/Views/Auth/SingUp';
import { Scanner } from '../components/Views/Auth/Scanner';

import { createStackNavigator } from '@react-navigation/stack';

import { Loading } from '../components/Views/Loading';

const Stack = createStackNavigator();

export default function AppRoutes() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    if (isLoading) {
        return <Loading />
    }

    return (
        <Stack.Navigator
            initialRouteName='SingIn'
            screenOptions={{
                headerShown: false,
            }}>

            <Stack.Screen name='SingIn' component={SingIn} />
            <Stack.Screen name='SingUp' component={SingUp} />
            <Stack.Screen name='Scanner' component={Scanner} />
        </Stack.Navigator>
    );
}