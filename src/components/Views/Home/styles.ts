import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 32
    },
    text: {
        color: THEME.COLORS.TEXT
    },
    contadorArea: {},
    contadorHeader: {

    },
    contadorHeaderH1: {
        color: 'red'
    },
    contadorBody: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8
    },
    contadorBodyItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8
    },
    contadorBodyItemTextContainer: {
        borderWidth: 2,
        borderColor: THEME.COLORS.PRIMARY,
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.COLORS.BACKGROUND_1,
    },
    contadorBodyItemText: {
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.LG,
        color: THEME.COLORS.PRIMARY
    },
    contadorBodyItemTextLegend: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.SM,
        color: THEME.COLORS.TEXT
    },
    metasArea: {},
    calendarioArea: {},
});