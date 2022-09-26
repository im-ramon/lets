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
    },
    socialIconsArea: {
        marginTop: 64,
        width: '100%',
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    socialIconsIcon: {
        color: THEME.COLORS.PRIMARY,
    }
});