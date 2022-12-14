import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // paddingHorizontal: 16,
        alignItems: 'center',
        paddingVertical: 32
    },
    bloco: {
        borderBottomColor: THEME.COLORS.NEUTRAL_4,
        borderBottomWidth: 1,
        paddingBottom: 16,
        marginBottom: 24,
        width: '100%',
        position: 'relative',
        backgroundColor: THEME.COLORS.BACKGROUND_1
    },
    text: {
        color: THEME.COLORS.TEXT,
    },
    navMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
        width: '100%',
        paddingHorizontal: 16,
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
        marginVertical: 4,
        paddingHorizontal: 16,
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
        backgroundColor: THEME.COLORS.BACKGROUND_1
    },
    graficoEvolucaoSubtitleArea: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 16,
        justifyContent: 'center',
    },
    graficoEvolucaoSubtitleItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    graficoEvolucaoText: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.DT,
        marginLeft: 8
    },
    helpArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .7,
        marginBottom: 16,
    },
    helpAreaText: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.DT,
        marginLeft: 4
    },
    contadorEvolucao: {
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    contadorEvolucaoHeader: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.SM,
        width: '100%',
        textAlign: 'center'
    },
    contadorEvolucaoText: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD + 2,
        paddingVertical: 8,
        color: THEME.COLORS.TEXT,
        marginHorizontal: 4,
    },
    chart: {
        height: 245,
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
        right: 0,
        zIndex: 99,
    },
    textDedicatoria: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        color: THEME.COLORS.TEXT,
        textAlign: 'center',
        paddingBottom: 16
    },
    modalRestartContainer: {
        marginTop: 24,
        paddingBottom: 16
    },
    buttonArea: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',

    },
    viewShotStyle: {
        marginBottom: 0,
        borderBottomWidth: 0,
        paddingBottom: 0,
        paddingHorizontal: 16,
    },
    dateTimePickerArea: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});