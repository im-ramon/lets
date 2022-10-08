import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Button, Modal, StyleSheet, Alert, ActivityIndicator } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

import { Welcome } from '../../Welcome';

import { styles } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { FieldAreaStyled, FormStyled, InputStyled, LabelStyled } from '../../../parts/_SytyledComponents'
import { ButtonMedium } from '../../../parts/ButtonMedium';
import { formRules } from '../../../../utils/formRules';
import { THEME } from '../../../../theme'
import logo from '../../../../assets/img/icon.png'

import { AuthContext } from '../../../../../src/contexts/auth';

import { useNavigation } from '@react-navigation/native';

export function SingIn() {

    const refInputPalavraPasse: any = useRef()
    const navigation = useNavigation()

    const { signIn, loadingAuth, errorLogin, setErrorLogin } = useContext(AuthContext)

    const [userId, setUserId] = useState<string>('8edd84be-861b-4a2c-9aa2-452a66d8c644')
    const [userPassword, setUserPassword] = useState<string>('1234')
    const [showModalFirsVisit, setShowModalFirsVisit] = useState<boolean>(true)

    // Configurações do Scanner
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    const feedBackScanner = () => {
        Alert.alert('Código copiado!',
            'Clique em continar para fazer login.', [
            {
                text: 'continar', style: 'cancel',
                onPress: () => { setScanned(false) }
            }
        ]);
    }

    const [showModalCamera, setShowModalCamera] = useState<boolean>(false)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);
        setUserId(data)
        feedBackScanner()
        setShowModalCamera(false)
        refInputPalavraPasse.current.focus()
    };

    if (hasPermission === null) {
        return <Text>Solicitando permissão da câmera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à câmera</Text>;
    }
    // --- Fim

    function validaPalavraPasse(value: string) {
        let palavraPasseVerificada = value.replace(/[^a-z0-9]/gi, '')
        return palavraPasseVerificada.toUpperCase()
    }

    function handleModalButton(arg: boolean) {
        setShowModalFirsVisit(arg)
    }

    function handleLogin(id: string, password: string) {
        if (userId === '' || userPassword === '') {
            return;
        }

        signIn({ id, password })
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.logoArea}>
                        <Image source={logo} style={styles.logoImg}></Image>
                        <Text style={styles.logoText}><Text style={styles.bold}>Let's!</Text> | Especialista X</Text>
                    </View>
                    <FormStyled>
                        <FieldAreaStyled>
                            <LabelStyled>Código de acesso</LabelStyled>
                            <View style={styles.inputCameraArea}>
                                <TouchableOpacity style={styles.inputCameraButton} onPress={() => setShowModalCamera(true)}>
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
                                onChangeText={(value: string) => setUserPassword(validaPalavraPasse(value))}
                                value={userPassword}
                                ref={refInputPalavraPasse}
                                autoCompleteType='password'
                                placeholder="Digite sua palavra passe aqui"
                                placeholderTextColor={THEME.COLORS.SEMANTIC_2}
                                maxLength={formRules.maxLengthTextArea}
                            />
                        </FieldAreaStyled>
                        <View style={styles.buttonArea}>
                            <ButtonMedium value='Entrar' onPress={() => handleLogin(userId, userPassword)}>
                                {loadingAuth && <ActivityIndicator size={THEME.FONT_SIZE.SM} color={THEME.COLORS.TEXT} />}
                            </ButtonMedium>
                        </View>
                    </FormStyled>
                    <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('SingUp')}>
                        <Text style={styles.text}>Ainda não tem conta? <Text style={styles.bold}>Cadastre-se!</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalCamera}
                style={{ backgroundColor: 'purple' }}
            >
                <View style={styles.cameraContainer}>
                    <View style={styles.titleArea}>
                        <Text style={styles.cameraTitle}>Aponte a câmera para seu QR Code.</Text>
                        <Text style={styles.cameraSubtitle}>O aplicativo fará a leitura automaticamente</Text>
                    </View>

                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />

                    {scanned && <Button title={'Escanear novamente'} onPress={() => setScanned(false)} />}
                    <View style={styles.cameraButtonArea}>
                        <ButtonMedium value='Voltar' onPress={() => setShowModalCamera(false)} />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={false}
                visible={!showModalFirsVisit}
            // visible={showModalFirsVisit}
            >
                <Welcome
                    handleModal={handleModalButton}
                />
            </Modal>
        </View>
    );
}