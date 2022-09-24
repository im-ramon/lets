import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { THEME } from '../../../theme';

interface TituloProps extends ViewProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export function Titulo(props: TituloProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.children} {props.title}</Text>
            {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
    },
    title: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.LG,
        marginVertical: 16
    },
    subtitle: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        color: THEME.COLORS.SEMANTIC_2,
        fontSize: THEME.FONT_SIZE.SM,
        textAlign: 'justify'
    }
});