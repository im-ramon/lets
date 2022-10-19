import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../../../contexts/auth';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

import { InputStyled, LabelStyled, FieldAreaStyled, FormStyled } from '../../../parts/_SytyledComponents'
import { THEME } from '../../../../theme';
import { ButtonMedium } from '../../../parts/ButtonMedium';
import { api } from '../../../../services/api';

export function MeusDados() {
    const { user } = useContext(AuthContext)

    const [newName, setNewName] = useState<string>(user.name)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function copyToClipboard() {
        await Clipboard.setStringAsync(user.id);
    };

    function showToastCopied() {
        ToastAndroid.show('ID copiado!', ToastAndroid.SHORT);
    }

    async function fetchSalveNewName() {
        const response = await api.patch('/alter_user_name', {
            new_name: newName
        })
        // JSON.stringify(response.data)

        const user = await AsyncStorage.getItem('@lets:user_logged') || ''
        const userJSON = JSON.parse(user)
        console.log(userJSON.name = response.data.name)
        // console.log(response.data)
    }

    return (
        <View style={styles.container}>
            <FormStyled>
                <FieldAreaStyled>
                    <LabelStyled>Nome</LabelStyled>
                    <InputStyled value={newName} onChangeText={setNewName} />
                </FieldAreaStyled>

                <FieldAreaStyled>
                    <LabelStyled>Id para login</LabelStyled>
                    <TouchableOpacity onPress={() => { copyToClipboard(); showToastCopied() }}>
                        <InputStyled editable={false} value={user.id} />
                    </TouchableOpacity>
                    <Text style={styles.subtitle}>Clique no campo para copiar seu ID.</Text>
                </FieldAreaStyled>
                <ButtonMedium color={THEME.COLORS.PRIMARY} onPress={() => fetchSalveNewName()} value='Salvar'>
                    {isLoading && <ActivityIndicator color={THEME.COLORS.TEXT} size={THEME.FONT_SIZE.SM} />}
                </ButtonMedium>
            </FormStyled>
        </View>
    );
}