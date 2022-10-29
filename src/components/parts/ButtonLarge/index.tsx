import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native'
import { THEME } from "../../../theme"

interface ButtonProps extends TouchableOpacityProps {
    value: string
}

export function ButtonLarge({ value, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={[styles.text, styles.textButton]}>{value}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME.COLORS['DARK'].PRIMARY,
        color: THEME.COLORS['DARK'].TEXT,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: THEME.COLORS['DARK'].TEXT,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: THEME.FONT_FAMILY.BOLD,
    },
    textButton: {
        fontSize: THEME.FONT_SIZE.MD,
    }
})