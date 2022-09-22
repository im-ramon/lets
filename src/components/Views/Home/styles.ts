import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 32,
        paddingHorizontal: 16
    },
    text: {
        color: THEME.COLORS.TEXT
    },
    navMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16
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
    apresentacaoApp: {
        borderBottomColor: THEME.COLORS.PRIMARY_SOFT,
        borderBottomWidth: 1,
        paddingBottom: 24
    },
    boasvindasTextH1: {
        fontSize: THEME.FONT_SIZE.LG,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        color: THEME.COLORS.TEXT,
        marginVertical: 12
    },
    boasvindasTextP: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.SM,
    },
    contadorEvolucao: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    chart: {
        height: 260,
        marginVertical: 16,
    },
});