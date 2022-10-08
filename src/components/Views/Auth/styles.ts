import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 32,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 16,
        paddingBottom: 64,
    },
    content: {
        alignItems: 'center',
        paddingVertical: 64,
    },
    pageTitleArea: {
        marginTop: 16,
        marginBottom: 40,
        paddingVertical: 8
    },
    text: {
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR
    },
    bold: {
        fontFamily: THEME.FONT_FAMILY.BOLD
    },
    logoArea: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoImg: {
        width: 128,
        height: 128
    },
    logoText: {
        fontSize: THEME.FONT_SIZE.MD + 4,
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        paddingVertical: 16
    },
    buttonArea: {
        width: '100%',
        alignItems: 'center'
    },
    registerButton: {
        marginTop: 40
    },
    inputCameraArea: {
        position: 'relative'
    },
    inputCameraButton: {
        position: 'absolute',
        // backgroundColor: 'red',
        height: '100%',
        paddingHorizontal: 8,
        justifyContent: 'center',
        top: 0,
        right: 0,
        zIndex: 2
    },
    helpText: {
        fontSize: THEME.FONT_SIZE.DT,
        color: THEME.COLORS.SEMANTIC_2,
        textAlign: 'right',
        paddingTop: 8,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
    },
    strong: {
        color: THEME.COLORS.PRIMARY,
        fontFamily: THEME.FONT_FAMILY.BOLD
    },
    cameraContainer: {
        flex: 1,
        width: '100%',
        paddingVertical: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: THEME.COLORS.BACKGROUND_1 + 'dd',
    },
    titleArea: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraTitle: {
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        zIndex: 10,
    },
    cameraSubtitle: {
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        color: THEME.COLORS.TEXT,
        zIndex: 10
    },
    cameraButtonArea: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    modalContent: {
        marginBottom: 32
    },
    copyIdArea: {
        backgroundColor: THEME.COLORS.BLACK,
        flexDirection: 'row'
    },
    copyIdTextArea: {
        backgroundColor: THEME.COLORS.BLACK,
        padding: 16,
    },
    iconArea: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textModal: {
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        marginBottom: 8,
    },
    qrCodeArea: {
        backgroundColor: THEME.COLORS.BLACK,
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'center'
    },
    buttonAreaModal: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },
});