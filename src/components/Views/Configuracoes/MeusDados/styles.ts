import { StyleSheet } from 'react-native';
import { THEME } from '../../../../theme';


export const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    text: {
        color: THEME.COLORS['DARK'].TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: THEME.FONT_SIZE.SM
    },
    subtitle: {
        color: THEME.COLORS['DARK'].SEMANTIC_2,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: THEME.FONT_SIZE.DT,
        textAlign: 'right'
    }
});