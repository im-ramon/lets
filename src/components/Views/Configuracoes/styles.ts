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
    contadorArea: {
        alignItems: 'center'
    },
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
    contadorLegend: {
        backgroundColor: THEME.COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        width: '80%',
    },
    contadorLegendText: {
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.REGULAR
    },
    chart: {
        height: 220,
        marginVertical: 16
    },
});