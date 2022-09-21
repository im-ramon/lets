import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { THEME } from '../../../theme';

interface TituloProps extends ViewProps {
    content: string;
}

export function Titulo(props: TituloProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.content}
            </Text>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderBottomColor: THEME.COLORS.PRIMARY,
        borderBottomWidth: 2
    },
    text: {
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.MD
    }
});