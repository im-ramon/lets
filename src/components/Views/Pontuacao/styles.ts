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
        paddingVertical: 16,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: THEME.COLORS.BACKGROUND_1,
    },
    text: {
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR
    },
    bold: {
        fontFamily: THEME.FONT_FAMILY.BOLD
    },
    patenteArea: {
        paddingTop: 32,
        alignItems: 'center',
        marginBottom: 16
    },
    patenteImage: {
        width: 256,
        height: 256
    },
    patenteScreenshotStyle: {
        borderWidth: 4,
        borderColor: THEME.COLORS.PRIMARY
    },
    patentSlug: {
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.XL,
        marginTop: 32,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: THEME.COLORS.PRIMARY
    },
    patenteDescription: {
        color: THEME.COLORS.SEMANTIC_2,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        marginTop: 8,
        textAlign: 'center'
    },
    pointsArea: {
        marginBottom: 32,
        alignItems: 'center'
    },
    buttonArea: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 64
    },
    center: {
        textAlign: 'center'
    }
});