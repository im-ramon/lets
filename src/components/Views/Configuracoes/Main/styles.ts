import { StyleSheet } from 'react-native';
import { THEME } from '../../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 32,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%',
    },
    text: {
        color: THEME.COLORS.TEXT
    },
    cardConfiguracoes: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 16,
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
    CardInfoContainer: {
        flexDirection: 'row',

    },
    switchContainer: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: THEME.COLORS.NEUTRAL_4,
        borderBottomWidth: 1,
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
    developerArea: {
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center'
    },
    developerAreaText: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        color: THEME.COLORS.SEMANTIC_2,
        fontSize: THEME.FONT_SIZE.SM - 2,
        marginBottom: 4
    },
    logoArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8
    },
    developerLogoText: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        color: THEME.COLORS.SEMANTIC_2,
        fontSize: THEME.FONT_SIZE.SM,
        lineHeight: 16,
    },
    logoRamonoliveira: {
        width: 16,
        height: 16,
        marginRight: 4,
        opacity: .5
    },
    toggleThemeButton: {
        backgroundColor: '#yellow',
        width: 32,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: THEME.COLORS.NEUTRAL_4
    },
    toggleThemeButtonDark: {
        backgroundColor: THEME.COLORS.BLACK,
        marginBottom: 8
    },
    toggleThemeButtonLight: {
        backgroundColor: THEME.COLORS.NEUTRAL_1
    }
});