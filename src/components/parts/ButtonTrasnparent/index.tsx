import { Text, View, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native'
import { THEME } from "../../../theme"

interface ButtonProps extends TouchableOpacityProps {
    value: string,
    badge?: string | null,
    children?: React.ReactNode;
}

export function ButtonTrasnparent({ value, children, badge, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            {badge ? (<View style={styles.buttonBadgeArea}><Text style={styles.buttonBadgeText}>{badge}</Text></View>) : null}
            <Text style={styles.text}>{value}</Text>
            {children ? (<View style={styles.icon}>{children}</View>) : false}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        color: THEME.COLORS.TEXT,
        paddingHorizontal: 32,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 250,
        borderWidth: 1,
        borderColor: THEME.COLORS.PRIMARY,
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
    },
    buttonBadgeArea: {
        position: 'absolute',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 24,
        height: 24,
        padding: 2,
        top: -12,
        right: -12,
        zIndex: 2,
        backgroundColor: THEME.COLORS.PRIMARY,
        borderColor: '#ffffff',
        borderWidth: 2,
    },
    buttonBadgeText: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.DT,
    }
})