import { View, ActivityIndicator, StyleSheet, Image, Text } from 'react-native'
import { THEME } from '../../../theme/index'
import logo from '../../../assets/img/icon.png'

export function Loading() {
    return (
        <View style={styles.container}>
            <View style={styles.logoArea}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.text}>
                    <Text style={styles.strong}>Let's!</Text> <Text style={styles.pipe}>|</Text> Especialista X</Text>
            </View>
            <ActivityIndicator color={THEME.COLORS.PRIMARY} size={32} />
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.COLORS.BACKGROUND_1
    },
    text: {
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXT
    },
    strong: {
        fontWeight: 'bold',
    },
    pipe: {
        color: THEME.COLORS.NEUTRAL_2
    },
    logoArea: {
        padding: 8,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 32,
        height: 32,
        marginRight: 8
    }
});