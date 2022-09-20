import React from 'react';
import { View, Text } from 'react-native';
import { Titulo } from '../../parts/Titulo';

import { styles } from './styles';


interface ContadorCardProps {
    contador: string,
    tipoDeData: string
}

function ContadorCard(props: ContadorCardProps) {
    return (
        <View style={styles.contadorBodyItem}>
            <View style={styles.contadorBodyItemTextContainer}>
                <Text style={styles.contadorBodyItemText}>{props.contador}</Text>
            </View>
            <Text style={styles.contadorBodyItemTextLegend}>{props.tipoDeData}</Text>
        </View>
    )
}

export function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.contadorArea}>
                <View style={styles.contadorHeader}>
                    <Titulo content='Seu tempo vivendo em liberdade'></Titulo>
                </View>
                <View style={styles.contadorBody}>
                    <ContadorCard contador='02' tipoDeData='Anos' />
                    <ContadorCard contador='00' tipoDeData='Meses' />
                    <ContadorCard contador='07' tipoDeData='Dias' />
                    <ContadorCard contador='18' tipoDeData='Horas' />
                    <ContadorCard contador='15' tipoDeData='Minutos' />
                </View>
            </View>
            <View style={styles.metasArea}>
                <Text style={styles.text}>Metas aqui</Text>
            </View>
            <View style={styles.calendarioArea}>
                <Text style={styles.text}>Calendário aqui</Text>
            </View>
        </View>
    );
}



