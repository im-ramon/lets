import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: THEME.COLORS.TEXT
    }
});