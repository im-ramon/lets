import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

export function Pontuacao() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pontuação</Text>
        </View>
    );
}