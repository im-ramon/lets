import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

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
        paddingTop: 16
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
    }
});