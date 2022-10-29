import { Text, View, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native'
import { THEME } from "../../../theme"

interface ButtonProps extends TouchableOpacityProps {
    value: string,
    children?: React.ReactNode;
}

export function ButtonTrasnparent({ value, children, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={styles.text}>{value}</Text>
            {children ? (<View style={styles.icon}>{children}</View>) : false}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        color: THEME.COLORS['DARK'].TEXT,
        paddingHorizontal: 32,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 250,
        borderWidth: 1,
        borderColor: THEME.COLORS['DARK'].PRIMARY,
        marginVertical: 8
    },
    text: {
        color: THEME.COLORS['DARK'].TEXT,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD,
    },
    icon: {
        marginLeft: 8
    }
})