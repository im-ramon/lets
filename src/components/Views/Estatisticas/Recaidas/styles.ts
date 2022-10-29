import { StyleSheet } from 'react-native';
import { THEME } from '../../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 24,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    text: {
        color: THEME.COLORS['DARK'].TEXT,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.REGULAR
    },
    flatList: {
        width: '100%',
        marginBottom: 16
    }
});