import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { THEME } from '../../../theme/index'

export function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                color={THEME.COLORS.PRIMARY}
                size={32}
            />
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.COLORS.BACKGROUND_1
    }
});