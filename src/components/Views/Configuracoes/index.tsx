import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";

import { Titulo } from '../../parts/Titulo';
import { styles } from './styles';


export function Configuracoes() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Configurações</Text>
        </View>
    );
}



