import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';

import { THEME } from '../../../theme';

interface CardConfiguracoesProps extends TouchableOpacityProps {
    title: string,
    description: string
    children: React.ReactNode,
}

export function CardInfo({ title, description, children, ...rest }: CardConfiguracoesProps) {
    return (
        <TouchableOpacity style={styles.cardConfiguracoes} {...rest}>
            <View style={styles.cardConfiguracoesIcon}>{children}</View>
            <View style={styles.cardConfiguracoesTextContainer}>
                <Text style={styles.cardConfiguracoesTextTitle}>{title}</Text>
                <Text style={styles.cardConfiguracoesTextDescription}>{description}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardConfiguracoes: {
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: THEME.COLORS.NEUTRAL_4,
        borderBottomWidth: 1,
        marginTop: 8,
        paddingBottom: 8
    },
    cardConfiguracoesIcon: {
        width: 56,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardConfiguracoesTextContainer: {
        height: 64,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    cardConfiguracoesTextTitle: {
        fontFamily: THEME.FONT_FAMILY.BOLD,
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.MD
    },
    cardConfiguracoesTextDescription: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        color: THEME.COLORS.SEMANTIC_2,
        fontSize: THEME.FONT_SIZE.SM
    },
});