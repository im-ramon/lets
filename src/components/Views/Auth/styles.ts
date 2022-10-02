import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 32,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 16,
        paddingBottom: 64,
    },
    content: {
        alignItems: 'center',
        paddingVertical: 64,
    },
    pageTitleArea: {
        marginTop: 16,
        marginBottom: 40,
        paddingVertical: 8
    },
    pageTItle: {
        textAlign: 'center',
        fontSize: THEME.FONT_SIZE.XL,
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.BOLD,
    },
    pageSubtitle: {
        textAlign: 'center',
        fontSize: THEME.FONT_SIZE.SM,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        color: THEME.COLORS.SEMANTIC_2,
    },
    text: {
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR
    },
    bold: {
        fontFamily: THEME.FONT_FAMILY.BOLD
    },
    logoArea: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoImg: {
        width: 128,
        height: 128
    },
    logoText: {
        fontSize: THEME.FONT_SIZE.MD + 4,
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        paddingVertical: 8
    },
    buttonArea: {
        width: '100%',
        alignItems: 'center'
    },
    registerButton: {
        marginTop: 40
    },
    inputCameraArea: {
        position: 'relative'
    },
    inputCameraButton: {
        position: 'absolute',
        // backgroundColor: 'red',
        height: '100%',
        paddingHorizontal: 8,
        justifyContent: 'center',
        top: 0,
        right: 0,
        zIndex: 2
    },
    helpText: {
        fontSize: THEME.FONT_SIZE.DT,
        color: THEME.COLORS.SEMANTIC_2,
        textAlign: 'right',
        paddingTop: 8,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
    },
    strong: {
        color: THEME.COLORS.PRIMARY,
        fontFamily: THEME.FONT_FAMILY.BOLD
    }
});