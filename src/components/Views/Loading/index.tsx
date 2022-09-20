import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { THEME } from '../../../theme/index'

export function Loading() {
    return (
        <View>
            <ActivityIndicator
                color={THEME.COLORS.PRIMARY}
                size={32}
            />
        </View>
    )
}