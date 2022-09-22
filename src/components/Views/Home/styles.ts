import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 32,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    bloco: {
        borderBottomColor: THEME.COLORS.NEUTRAL_4,
        borderBottomWidth: 1,
        paddingBottom: 16,
        marginBottom: 24,
        width: '100%',
        position: 'relative'
    },
    text: {
        color: THEME.COLORS.TEXT,
    },
    navMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
        width: '100%'
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoImg: {
        width: 30,
        height: 30,
        marginRight: 8
    },
    logoText: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXT
    },
    pontosContainer: {
        justifyContent: 'center'
    },
    pontosText: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.SM,
        color: THEME.COLORS.TEXT
    },
    boasvindasTextH1: {
        fontSize: THEME.FONT_SIZE.LG,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        color: THEME.COLORS.TEXT,
        marginVertical: 12,
    },
    boasvindasTextP: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.SM,
    },
    graficoEvolucao: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contadorEvolucao: {
        alignItems: 'center',
    },
    contadorEvolucaoHeader: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.SM,
    },
    contadorEvolucaoText: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD + 2,
        paddingVertical: 8,
        color: THEME.COLORS.TEXT,
    },
    chart: {
        height: 260,
    },
    contadorEvolucaoTextbold: {
        fontFamily: THEME.FONT_FAMILY.BLACK,
        color: THEME.COLORS.TEXT,
    },
    contadorEvolucaoTextGrey: {
        color: THEME.COLORS.NEUTRAL_3,
    },
    shareButton: {
        position: 'absolute',
        top: 24,
        right: 16,
        zIndex: 99,
    }
});