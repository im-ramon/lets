import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../../../contexts/auth';
import Toast from 'react-native-toast-message';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import consoleFeedback from '../../../../utils/consoleConfig';
import { InputStyled, LabelStyled, FieldAreaStyled, FormStyled } from '../../../parts/_SytyledComponents'
import { THEME } from '../../../../theme';
import { ButtonMedium } from '../../../parts/ButtonMedium';
import { api } from '../../../../services/api';
import { useNavigation } from '@react-navigation/native';

export function MeusDados() {
    const { user, setUser } = useContext(AuthContext)

    const navigation = useNavigation()

    const [newName, setNewName] = useState<string>(user.name)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function copyToClipboard() {
        await Clipboard.setStringAsync(user.id);
    };

    function showToastCopied() {
        ToastAndroid.show('ID copiado!', ToastAndroid.SHORT);
    }

    async function salveNewName() {
        if (newName === '') return;
        setIsLoading(true)
        try {
            await api.patch('/alter_user_name', { new_name: newName })
                .then(response => response.data)
                .then(async data => {
                    const user = await AsyncStorage.getItem('@lets:user_logged') || ''
                    const objUser = JSON.parse(user)
                    objUser.name = data.name
                    return objUser
                })
                .then(async objUser => {
                    setUser({ id: objUser.id, token: objUser.token, name: objUser.name })
                    await AsyncStorage.setItem('@lets:user_logged', JSON.stringify(objUser))
                    navigation.goBack()
                    Toast.show({
                        type: 'success',
                        text1: 'Informação salva!',
                        text2: 'Seu nome foi alterado com sucesso.'
                    });
                })

        } catch (error) {
            consoleFeedback('error', 'salveNewName', error)
            Toast.show({
                type: 'error',
                text1: 'Algo deu errado!',
                text2: 'Não foi possível alterar seu nome.'
            });
        } finally {
            setIsLoading(false)
        }
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
                <ButtonMedium color={THEME.COLORS.PRIMARY} onPress={() => salveNewName()} value='Salvar'>
                    {isLoading && <ActivityIndicator color={THEME.COLORS.TEXT} size={THEME.FONT_SIZE.SM} />}
                </ButtonMedium>
            </FormStyled>
        </View>
    );
}