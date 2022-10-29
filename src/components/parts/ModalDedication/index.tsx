import React from 'react';
import { View, StyleSheet, Modal, ModalProps, TouchableOpacity } from 'react-native';
import { Titulo } from '../Titulo'

import { Ionicons } from '@expo/vector-icons'
import { THEME } from '../../../theme';

interface ModalDedicationProps extends ModalProps {
    header: string;
    modalVisible: boolean;
    children: React.ReactNode;
    handleModal: (arg: boolean) => void;
}

export function ModalDedication({ header, modalVisible, children, handleModal, ...rest }: ModalDedicationProps) {
    return (
        <Modal {...rest} animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.containerModal}>
                <View style={styles.contentModal}>
                    <TouchableOpacity onPress={() => { handleModal(false) }} style={styles.closeButton}>
                        <Ionicons name="ios-close-outline" size={28} color={THEME.COLORS.PRIMARY} />
                    </TouchableOpacity>
                    <Titulo
                        title={header}
                    >
                        <Ionicons name="heart" size={24} color={THEME.COLORS.PRIMARY} />
                    </Titulo>
                    {children}
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: '#000000dd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentModal: {
        backgroundColor: THEME.COLORS.BACKGROUND_1,
        position: 'relative',
        paddingBottom: 16,
        paddingHorizontal: 16,
        width: '80%'
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