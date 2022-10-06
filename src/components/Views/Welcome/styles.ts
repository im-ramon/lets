import { StyleSheet } from "react-native"
import { THEME } from "../../../theme/index"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative'
    },
    text: {
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR
    },
    textBemvindo: {
        fontSize: THEME.FONT_SIZE.XXL,
        fontFamily: THEME.FONT_FAMILY.DANCINGSCRIPT_BOLD
    },
    textApresentacao: {
        color: THEME.COLORS.TEXT,
        textAlign: 'right',
        paddingTop: 24,
        paddingBottom: 32,
        fontSize: THEME.FONT_SIZE.SM
    },
    main: {
        width: '80%',
        justifyContent: 'center',
        marginBottom: 32,
    },
    logoImg: {
        width: 30,
        height: 30,
        marginRight: 8,
    },
    logoContainer: {
        position: 'absolute',
        top: 16,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        paddingVertical: 4
    },
    logoText: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXT
    },
})