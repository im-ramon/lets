import { Pontuacao } from '../components/Views/Pontuacao'
import { Estatisticas } from '../components/Views/Estatisticas'
import { Home } from '../components/Views/Home'
import { Utilidades } from '../components/Views/Utilidades'
import { Configuracoes } from '../components/Views/Configuracoes'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../theme'

const TabNavigator = createBottomTabNavigator();

export default function AuthRoutes() {
    return (
        <TabNavigator.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveBackgroundColor: THEME.COLORS.PRIMARY,
                tabBarActiveTintColor: THEME.COLORS.NEUTRAL_1,
                tabBarStyle: {
                    backgroundColor: THEME.COLORS.BACKGROUND_1,
                    borderTopWidth: 0,
                    borderTopColor: THEME.COLORS.BLACK,
                }
            }}>

            <TabNavigator.Screen
                name='Pontuacao'
                component={Pontuacao}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="medal-outline" size={size} color={color} />
                    },
                }}

            />

            <TabNavigator.Screen
                name='Estatisticas'
                component={Estatisticas}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="stats-chart-outline" size={size} color={color} />
                    },
                }}

            />

            <TabNavigator.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="home-outline" size={size} color={color} />
                    },
                }}

            />

            <TabNavigator.Screen
                name='Utilidades'
                component={Utilidades}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="link-outline" size={size} color={color} />
                    },
                }}

            />

            <TabNavigator.Screen
                name='Configuracoes'
                component={Configuracoes}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="settings-outline" size={size} color={color} />
                    },
                }}
            />
        </TabNavigator.Navigator>
    );
}