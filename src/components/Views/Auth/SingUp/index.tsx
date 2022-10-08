import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { AuthContext } from '../../../../contexts/auth';

import { styles } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { FieldAreaStyled, FormStyled, InputStyled, LabelStyled, PageScrollViewContainer, PageContainerView } from '../../../parts/_SytyledComponents'

import { ButtonMedium } from '../../../parts/ButtonMedium';
import { formRules } from '../../../../utils/formRules';
import { Titulo } from '../../../parts/Titulo';
import { ButtonLarge } from '../../../parts/ButtonLarge';
import { ModalShort } from '../../../parts/ModalShort';

import { THEME } from '../../../../theme'

export function SingUp() {

    const { signUp, signIn, loadingAuth, createdUserId } = useContext(AuthContext)

    const [nome, setNome] = useState<string>('')
    const [palavraPasse, setPalavraPasse] = useState<string>('')
    const [showModalCreatedUser, setShowModalCreatedUser] = useState<boolean>(false)

    function validaPalavraPasse(value: string) {
        let palavraPasseVerificada = value.replace(/[^a-z0-9]/gi, '')
        return palavraPasseVerificada.toUpperCase()
    }


    async function handleSignUp(name: string, password: string) {
        if (nome === '' || palavraPasse === '') {
            return;
        }

        await signUp({ name, password })
        setShowModalCreatedUser(true)
    }

    async function copyToClipboard() {
        await Clipboard.setStringAsync(createdUserId);
    };

    return (
        <PageContainerView>
            <PageScrollViewContainer style={styles.scrollViewContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Titulo title='Cadastrar-se' subtitle='Cadastra-se e tenha acesso completo ao App. Nenhum dado pessoal precisa ser informado.'>
                        <Ionicons name="person-add-outline" size={24} color={THEME.COLORS.PRIMARY} />
                    </Titulo>
                    <FormStyled style={{ marginTop: 32 }}>
                        <FieldAreaStyled>
                            <LabelStyled>Nome ou apelido</LabelStyled>
                            <View style={styles.inputCameraArea}>
                                <InputStyled
                                    onChangeText={setNome}
                                    value={nome}
                                    autoCompleteType='username'
                                    placeholder="Digite seu nome ou apelido aqui"
                                    placeholderTextColor={THEME.COLORS.SEMANTIC_2}
                                    maxLength={formRules.maxLengthTextArea}
                                />
                            </View>
                            <Text style={styles.helpText}>Essa informação não será divulgada, mas se preferir, escolha um apelido, não precisa informar seu nome verdadeiro.</Text>
                        </FieldAreaStyled>

                        <FieldAreaStyled>
                            <LabelStyled>Palavra passe</LabelStyled>
                            <View style={styles.inputCameraArea}>
                                <InputStyled
                                    onChangeText={(value: string) => setPalavraPasse(validaPalavraPasse(value))}
                                    value={palavraPasse}
                                    autoCompleteType='username'
                                    placeholder="Escolha uma palavra passe"
                                    placeholderTextColor={THEME.COLORS.SEMANTIC_2}
                                    maxLength={64}
                                />
                            </View>
                            <Text style={styles.helpText}><Text style={styles.strong}>IMPORTANTE:</Text> na versão atual do aplicativo, <Text style={styles.bold}>não há como recuperar ou redefinir a palavra passe</Text>, portanto, escolha uma palavra passe que possa lembra-se com facilidade.</Text>
                        </FieldAreaStyled>

                        <View style={styles.buttonArea}>
                            <ButtonMedium value='Cadastrar' onPress={() => handleSignUp(nome, palavraPasse)}>
                                {loadingAuth && <ActivityIndicator size={THEME.FONT_SIZE.SM} color={THEME.COLORS.TEXT} />}
                            </ButtonMedium>
                        </View>
                    </FormStyled>

                </ScrollView>
            </PageScrollViewContainer>

            <ModalShort
                modalVisible={showModalCreatedUser}
                handleModal={setShowModalCreatedUser}
            >
                <Titulo title='Cadastro realizado!'>
                    <Ionicons name="checkmark-circle-outline" size={24} color={THEME.COLORS.PRIMARY} />
                </Titulo>

                <View style={styles.modalContent}>
                    <Text style={styles.textModal}>Seu ID para login é:</Text>
                    <TouchableOpacity style={styles.copyIdArea} onPress={() => copyToClipboard()}>
                        <ScrollView horizontal={true} style={styles.copyIdTextArea}>
                            <Text style={styles.text}>{createdUserId || (<ActivityIndicator size={THEME.FONT_SIZE.SM} color={THEME.COLORS.PRIMARY} />)}</Text>
                        </ScrollView>
                        <View style={styles.iconArea}>
                            <TouchableOpacity onPress={() => copyToClipboard()}>
                                <Ionicons name="copy-outline" size={24} color={THEME.COLORS.TEXT} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 32 }}>
                        <Text style={styles.helpText}><Text style={styles.strong}>IMPORTANTE: </Text>Guarde bem seu código de acesso. Ele será solcitado quando for realizar login novamente. Sem ele, você perderá seu progresso no App. Esta é uma forma de deixar sua experiência no App totalmente anônima.</Text>
                    </View>
                    <Text style={styles.textModal}>Gere um QR Code com seu ID, assim, da próxima vez que acessar o App, basta escaneá-lo:</Text>
                    <TouchableOpacity style={styles.qrCodeArea} onPress={() => { Linking.openURL(`https://chart.googleapis.com/chart?cht=qr&chs=177x177&chl=${createdUserId}`); }}>
                        <Ionicons name="ios-qr-code-outline" size={24} color={THEME.COLORS.PRIMARY} />
                        <Text style={{ ...styles.text, marginLeft: 8 }}>Gerar QRCode</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonAreaModal}>
                    <ButtonLarge value='Continuar' onPress={() => signIn({ id: createdUserId, password: palavraPasse })}>
                        {loadingAuth && <ActivityIndicator size={THEME.FONT_SIZE.SM} color={THEME.COLORS.TEXT} />}
                    </ButtonLarge>
                </View>

            </ModalShort>
        </PageContainerView>
    );
}