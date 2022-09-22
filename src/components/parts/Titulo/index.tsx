import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { THEME } from '../../../theme';

interface TituloProps extends ViewProps {
    content: string;
    children: React.ReactNode;
}

export function Titulo(props: TituloProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.children}  {props.content}
            </Text>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderBottomColor: THEME.COLORS.PRIMARY,
        borderBottomWidth: 1,
        marginVertical: 16
    },
    text: {
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.LG
    }
});