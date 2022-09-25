import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Titulo } from '../../parts/Titulo';
import { CardInfo } from '../../parts/CardInfo';

import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../../theme';

export function Estatisticas() {
    return (
        <View style={styles.container}>
            <Titulo
                title='Estatísticas'
                subtitle='Aqui estão suas estatísticas desde o começo da jornada para romper com hábito de consumo de conteúdo explícito.'
            >
                <Ionicons name="stats-chart-outline" size={24} color={THEME.COLORS.PRIMARY} />
            </Titulo>

            <ScrollView style={styles.scrollViewContainer}>
                <CardInfo
                    title='Maior tempo sem consumo'
                    description='00a 00m 00d 00h 00m 00s'
                >
                    <MaterialCommunityIcons name="arm-flex-outline" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo
                    title='Última recaída'
                    description='1º de janeiro de 2022'
                >
                    <AntDesign name="exclamation" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo
                    title='Número total de recaídas'
                    description='00'
                >
                    <MaterialCommunityIcons name="restart-alert" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo
                    title='Motivos que levaram a recair'
                    description='> Clique para visualizar'
                >
                    <AntDesign name="questioncircleo" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>
            </ScrollView>
        </View>
    );
}