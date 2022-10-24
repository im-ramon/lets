import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Titulo } from '../../parts/Titulo';
import { CardInfo } from '../../parts/CardInfo';

import { AppContext } from '../../../contexts/app';

import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../../theme';
import moment from 'moment';

export function Estatisticas() {
    const { recordNoConsumption, lastConsumption, totalRelapse, recordNoConsumptionformated } = useContext(AppContext)

    function formatRecordNoConsumption(seconds: number) {
        let objRecord = JSON.parse(recordNoConsumptionformated)
        return `${objRecord.anos}a ${objRecord.meses}h ${objRecord.dias}d ${objRecord.horas}h ${objRecord.minutos}m ${objRecord.segundos}s `;
    }


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
                    description={formatRecordNoConsumption(recordNoConsumption)}
                >
                    <MaterialCommunityIcons name="arm-flex-outline" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo
                    title='Última recaída'
                    description={moment(lastConsumption).format("DD/MM/YYYY [às] HH:mm:ss")}
                >
                    <AntDesign name="exclamation" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo
                    title='Número total de recaídas'
                    description={totalRelapse}
                >
                    <MaterialCommunityIcons name="restart-alert" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo
                    title='Motivos que te levaram a recair'
                    description='> Clique para visualizar'
                >
                    <AntDesign name="questioncircleo" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>
            </ScrollView>
        </View>
    );
}