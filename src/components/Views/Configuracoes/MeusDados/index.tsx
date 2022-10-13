import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { AuthContext } from '../../../../contexts/auth';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

import * as Clipboard from 'expo-clipboard';

import { InputStyled, LabelStyled, FieldAreaStyled, FormStyled } from '../../../parts/_SytyledComponents'
import { THEME } from '../../../../theme';
import { ButtonMedium } from '../../../parts/ButtonMedium';

export function MeusDados() {
    const { user } = useContext(AuthContext)

    async function copyToClipboard() {
        await Clipboard.setStringAsync(user.id);
    };

    function showToastCopied() {
        ToastAndroid.show('ID copiado!', ToastAndroid.SHORT);
    }

    return (
        <View style={styles.container}>
            <FormStyled>
                <FieldAreaStyled>
                    <LabelStyled>Nome</LabelStyled>
                    <InputStyled value={user.name} />
                </FieldAreaStyled>

                <FieldAreaStyled>
                    <LabelStyled>Id para login</LabelStyled>
                    <TouchableOpacity onPress={() => { copyToClipboard(); showToastCopied() }}>
                        <InputStyled editable={false} value={user.id} />
                    </TouchableOpacity>
                    <Text style={styles.subtitle}>Clique no campo para copiar seu ID.</Text>
                </FieldAreaStyled>
                <ButtonMedium color={THEME.COLORS.PRIMARY} value='Salvar' />
            </FormStyled>

            <TextInput></TextInput>
        </View>
    );
}