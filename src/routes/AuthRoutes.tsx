import { Pontuacao } from '../components/Views/Pontuacao'
import { Estatisticas } from '../components/Views/Estatisticas'
import { Home } from '../components/Views/Home'
import { Ajuda } from '../components/Views/Ajuda'
import Configuracoes from '../components/Views/Configuracoes/index'

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
                tabBarActiveBackgroundColor: THEME.COLORS['DARK'].PRIMARY,
                tabBarActiveTintColor: THEME.COLORS['DARK'].NEUTRAL_1,
                tabBarStyle: {
                    backgroundColor: THEME.COLORS['DARK'].BACKGROUND_1,
                    borderTopWidth: 0,
                    borderTopColor: THEME.COLORS['DARK'].BLACK,
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
                name='Ajuda'
                component={Ajuda}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="help-buoy-outline" size={size} color={color} />
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