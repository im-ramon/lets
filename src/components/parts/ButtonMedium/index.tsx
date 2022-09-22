import { Text, View, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native'
import { THEME } from "../../../theme"

interface ButtonProps extends TouchableOpacityProps {
    value: string,
    children?: React.ReactNode;
}

export function ButtonMedium({ value, children, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={styles.text}>{value}</Text>
            {children ? (<View style={styles.icon}>{children}</View>) : false}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME.COLORS.PRIMARY,
        color: THEME.COLORS.TEXT,
        paddingHorizontal: 32,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 250,
        marginVertical: 8
    },
    text: {
        color: THEME.COLORS.TEXT,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD,
    },
    icon: {
        marginLeft: 8
    }
})