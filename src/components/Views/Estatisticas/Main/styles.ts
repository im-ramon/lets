import { StyleSheet } from 'react-native';
import { THEME } from '../../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 32,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 16
    },
    text: {
        color: THEME.COLORS.TEXT
    },
});