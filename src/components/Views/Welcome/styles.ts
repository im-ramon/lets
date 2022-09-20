import { StyleSheet } from "react-native"
import { THEME } from "../../../theme/index"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
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
    }
})