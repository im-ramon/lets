import React from 'react';
import { View, ScrollView } from 'react-native';

import { Titulo } from '../../parts/Titulo';

import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../../theme';

export function Pontuacao() {
    return (
        <View style={styles.container}>
            <Titulo
                title='Pontuação'
            >
                <Ionicons name="medal-outline" size={24} color={THEME.COLORS.PRIMARY} />
            </Titulo>

            <ScrollView style={styles.scrollViewContainer}>
            </ScrollView>
        </View>
    );
}