import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { styles } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { FieldAreaStyled, FormStyled, InputStyled, LabelStyled, PageScrollViewContainer, PageContainerView } from '../../../parts/_SytyledComponents'
import { ButtonMedium } from '../../../parts/ButtonMedium';
import { formRules } from '../../../../utils/formRules';
import { THEME } from '../../../../theme'
import { Titulo } from '../../../parts/Titulo';

export function SingUp() {

    const [nome, setNome] = useState<string>('')
    const [palavraPasse, setPalavraPasse] = useState<string>('')

    function validaPalavraPasse(value: string) {
        let palavraPasseVerificada = value.replace(/[^a-z0-9]/gi, '')
        return palavraPasseVerificada.toUpperCase()
    }

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
                            <ButtonMedium value='Cadastrar' />
                        </View>
                    </FormStyled>

                </ScrollView>
            </PageScrollViewContainer>
        </PageContainerView>
    );
}