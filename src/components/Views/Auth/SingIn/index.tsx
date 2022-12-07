import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';

import { Welcome } from '../../Welcome';
import Toast from 'react-native-toast-message';
import { styles } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { FieldAreaStyled, FormStyled, InputStyled, LabelStyled } from '../../../parts/_SytyledComponents'
import { ButtonMedium } from '../../../parts/ButtonMedium';
import { formRules } from '../../../../utils/formRules';
import { THEME } from '../../../../theme'
import logo from '../../../../assets/img/icon.png'

import { AuthContext } from '../../../../../src/contexts/auth';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SingIn() {

    const refInputPalavraPasse: any = useRef()
    const navigation = useNavigation()

    const { signIn, loadingAuth, userIdOnClipboard } = useContext(AuthContext)

    const [userId, setUserId] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [showModalFirsVisit, setShowModalFirsVisit] = useState<boolean>(false)

    useEffect(() => {
        setUserId(userIdOnClipboard);
    }, [userIdOnClipboard]);

    async function fetchIfIsFirstTimeInApp() {
        const response = await AsyncStorage.getItem('@lets:is_first_time_in_app')
        if (response == 'true' || response == null) {
            setShowModalFirsVisit(true)
        } else {
            setShowModalFirsVisit(false)
        }
    }

    async function handleSetFirstTimeInAPp() {
        setShowModalFirsVisit(false)
        await AsyncStorage.setItem('@lets:is_first_time_in_app', 'false')
    }

    function validaPalavraPasse(value: string) {
        let palavraPasseVerificada = value.replace(/[^a-z0-9]/gi, '')
        return palavraPasseVerificada.toUpperCase()
    }

    function handleLogin(id: string, password: string) {
        if (userId === '' || userPassword === '') {
            Toast.show({
                type: 'error',
                text1: 'Preencha o formulário corretamente.',
                text2: 'Todos os campos devem ser preenchidos.'
            });
            return;
        }

        signIn({ id, password })
    }

    const regexValidatorPassword = /[^a-z0-9]/gi;

    useEffect(() => {
        fetchIfIsFirstTimeInApp();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.logoArea}>
                        <Image source={logo} style={styles.logoImg}></Image>
                        <Text style={styles.logoText}><Text style={styles.bold}>Let's</Text> | Especialista X</Text>
                    </View>
                    <FormStyled>
                        <FieldAreaStyled>
                            <LabelStyled>ID do usuário</LabelStyled>
                            <View style={styles.inputCameraArea}>
                                <TouchableOpacity style={styles.inputCameraButton} onPress={() => navigation.navigate('Scanner')}>
                                    <Ionicons name="camera-outline" size={16} color={THEME.COLORS.TEXT} />
                                </TouchableOpacity>
                                <InputStyled
                                    onChangeText={setUserId}
                                    value={userId}
                                    autoCompleteType='username'
                                    placeholder="Digite seu código de acesso aqui"
                                    placeholderTextColor={THEME.COLORS.SEMANTIC_2}
                                    maxLength={formRules.maxLengthTextArea}
                                />
                            </View>
                            <Text style={styles.helpText}>Tem um QR Code? Clique na câmera acima para fazer o escaner.</Text>
                        </FieldAreaStyled>
                        <FieldAreaStyled>
                            <LabelStyled>Palavra passe</LabelStyled>
                            <InputStyled
                                onChangeText={(value: string) => setUserPassword(value.replace(regexValidatorPassword, ''))}
                                value={userPassword}
                                ref={refInputPalavraPasse}
                                autoCompleteType='password'
                                placeholder="Digite sua palavra passe aqui"
                                placeholderTextColor={THEME.COLORS.SEMANTIC_2}
                                maxLength={formRules.maxLengthTextArea}
                            />
                        </FieldAreaStyled>
                        <View style={styles.buttonArea}>
                            <ButtonMedium color={THEME.COLORS.PRIMARY} value='Entrar' onPress={() => handleLogin(userId, userPassword)}>
                                {loadingAuth && <ActivityIndicator size={THEME.FONT_SIZE.SM} color={THEME.COLORS.TEXT} />}
                            </ButtonMedium>
                        </View>
                    </FormStyled>
                    <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('SingUp')}>
                        <Text style={styles.text}>Ainda não tem conta? <Text style={styles.bold}>Cadastre-se!</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal animationType="slide" transparent={false} visible={showModalFirsVisit}>
                <Welcome handleModal={handleSetFirstTimeInAPp} />
            </Modal>
        </View>
    );
}