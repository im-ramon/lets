import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 32,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    scrollViewContainer: {
        // flex: 1,
        width: '100%',
        paddingVertical: 16,
        position: 'relative',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: THEME.COLORS['DARK'].BACKGROUND_1,
    },
    text: {
        color: THEME.COLORS['DARK'].TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR
    },
    bold: {
        fontFamily: THEME.FONT_FAMILY.BOLD
    },
    patenteArea: {
        paddingTop: 32,
        alignItems: 'center',
        marginBottom: 16
    },
    patenteImage: {
        width: 256,
        height: 256
    },
    patenteScreenshotStyle: {
        borderWidth: 4,
        borderColor: THEME.COLORS['DARK'].PRIMARY
    },
    patentSlug: {
        color: THEME.COLORS['DARK'].TEXT,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.XL,
        marginTop: 32,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: THEME.COLORS['DARK'].PRIMARY
    },
    patenteDescription: {
        color: THEME.COLORS['DARK'].SEMANTIC_2,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        marginTop: 8,
        textAlign: 'center'
    },
    pointsArea: {
        marginBottom: 32,
        alignItems: 'center'
    },
    buttonArea: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 64
    },
    center: {
        textAlign: 'center'
    },
    buttonsHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    infoButton: {
        marginLeft: 24,
        alignItems: 'flex-end',
    },
    scoreInformationscrollView: {
        // flex: 1,
        width: '100%',
        paddingTop: 16,
        paddingBottom: 32,
        position: 'relative',
    },
    scoreInformationModalContainer: {
        backgroundColor: 'purple',
    },
    scoreInformationText: {
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS['DARK'].TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
    },
    scoreInformationSubtitle: {
        marginTop: 32,
        fontSize: THEME.FONT_SIZE.SM,
        color: THEME.COLORS['DARK'].TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
    }
});