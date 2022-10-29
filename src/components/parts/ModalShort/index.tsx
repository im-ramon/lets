import React from 'react';
import { View, StyleSheet, Modal, ModalProps, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import { Ionicons } from '@expo/vector-icons'
import { THEME } from '../../../theme';

interface ModalShortProps extends ModalProps {
    modalVisible: boolean;
    children: React.ReactNode;
    handleModal: (arg: boolean) => void;
}

export function ModalShort({ modalVisible, children, handleModal, ...rest }: ModalShortProps) {
    return (
        <Modal {...rest} animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.containerModal}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={styles.contentModal}>
                    <TouchableOpacity onPress={() => { handleModal(false) }} style={styles.closeButton}>
                        <Ionicons name="ios-close-outline" size={28} color={THEME.COLORS['DARK'].PRIMARY} />
                    </TouchableOpacity>
                    {children}
                </KeyboardAvoidingView>
            </View>

        </Modal>
    );
}


const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: '#000000dd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentModal: {
        backgroundColor: THEME.COLORS['DARK'].BACKGROUND_1,
        position: 'relative',
        paddingHorizontal: 16,
        paddingBottom: 160,
        width: '90%',
    },
    closeButton: {
        position: 'absolute',
        backgroundColor: THEME.COLORS['DARK'].BACKGROUND_1,
        borderColor: THEME.COLORS['DARK'].BLACK,
        borderWidth: 2,
        right: -12,
        top: -12,
    }
});