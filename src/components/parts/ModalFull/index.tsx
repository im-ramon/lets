import React from 'react';
import { View, StyleSheet, Modal, ModalProps, KeyboardAvoidingView, Platform } from 'react-native';

import { THEME } from '../../../theme';

interface ModalFullProps extends ModalProps {
    modalVisible: boolean;
    children: React.ReactNode;
}

export function ModalFull({ modalVisible, children, ...rest }: ModalFullProps) {
    return (
        <Modal {...rest} animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.containerModal}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={styles.contentModal}>
                    {children}
                </KeyboardAvoidingView>
            </View>

        </Modal>
    );
}


const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: '#000000ee',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentModal: {
        backgroundColor: THEME.COLORS.BACKGROUND_1,
        position: 'relative',
        paddingHorizontal: 16,
        paddingBottom: 160,
        width: '90%',
        // height: '90%',
    },
    closeButton: {
        position: 'absolute',
        backgroundColor: THEME.COLORS.BACKGROUND_1,
        borderColor: THEME.COLORS.BLACK,
        borderWidth: 2,
        right: -12,
        top: -12,
    }
});