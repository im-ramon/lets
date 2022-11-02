import { useContext } from 'react';
import { Pontuacao } from '../components/Views/Pontuacao'
import { Estatisticas } from '../components/Views/Estatisticas'
import { Home } from '../components/Views/Home'
import { Ajuda } from '../components/Views/Ajuda'
import Configuracoes from '../components/Views/Configuracoes/index'
import { AppContext } from '../contexts/app';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../theme'
import moment from 'moment';

const TabNavigator = createBottomTabNavigator();

export default function AuthRoutes() {
    const { lastScoreUpdate } = useContext(AppContext)

    const wasThisRequestOneDayAfterTheLastRequest = moment().isAfter(lastScoreUpdate, 'day');

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
                    tabBarBadge: '1',
                    tabBarBadgeStyle: {
                        fontSize: THEME.FONT_SIZE.DT,
                        fontFamily: THEME.FONT_FAMILY.REGULAR,
                        color: THEME.COLORS.TEXT,
                        backgroundColor: THEME.COLORS.PRIMARY,
                        borderColor: '#ffffff',
                        borderWidth: 2,
                        opacity: wasThisRequestOneDayAfterTheLastRequest ? 1 : 0
                    },
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