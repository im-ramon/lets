import React from 'react';
import { View, StyleSheet } from 'react-native';
import { THEME } from '../../../theme';
import { Titulo } from '../Titulo';

interface BlocoProps {
    title: string,
    subtitle?: string,
    icon?: React.ReactNode
    content: React.ReactNode
}

export function BlocoConteudo(props: BlocoProps) {
    return (
        <View style={styles.container}>
            <Titulo title={props.title} subtitle={props.subtitle} >
                {props.icon}
            </Titulo>
            <View style={styles.content}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: THEME.COLORS.NEUTRAL_4,
        borderBottomWidth: 1,
        paddingBottom: 16,
        marginBottom: 32
    },
    content: {
        backgroundColor: 'red'
    }
});