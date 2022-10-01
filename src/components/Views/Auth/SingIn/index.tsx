import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

import { styles } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { FieldAreaStyled, FormStyled, InputStyled, LabelStyled } from '../../../parts/_SytyledComponents'
import { ButtonMedium } from '../../../parts/ButtonMedium';
import { formRules } from '../../../../utils/formRules';
import { THEME } from '../../../../theme'
import logo from '../../../assets/img/icon.png'

export function Singin() {

    const [accessCod, setAccessCod] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

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
                                <TouchableOpacity style={styles.inputCameraButton}>
                                    <Ionicons name="camera-outline" size={16} color={THEME.COLORS.TEXT} />
                                </TouchableOpacity>
                                <InputStyled
                                    onChangeText={setAccessCod}
                                    value={accessCod}
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
                                onChangeText={setPassword}
                                value={password}
                                autoCompleteType='password'
                                placeholder="Digite sua palavra passe aqui"
                                placeholderTextColor={THEME.COLORS.SEMANTIC_2}
                                maxLength={formRules.maxLengthTextArea}
                            />
                        </FieldAreaStyled>
                        <View style={styles.buttonArea}>
                            <ButtonMedium value='Entrar' />
                        </View>
                    </FormStyled>
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.text}>Ainda não tem conta? <Text style={styles.bold}>Cadastre-se!</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}