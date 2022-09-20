import { StyleSheet } from "react-native"
import { THEME } from "../../../theme"

export const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME.COLORS.PRIMARY,
        color: THEME.COLORS.TEXT,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: THEME.COLORS.TEXT,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: THEME.FONT_FAMILY.BOLD,
    },
    textButton: {
        fontSize: THEME.FONT_SIZE.MD,
    }
})