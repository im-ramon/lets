import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share, Image, Linking, Alert } from 'react-native';
import { AuthContext } from '../../../contexts/auth';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import * as Clipboard from 'expo-clipboard';

import { Titulo } from '../../parts/Titulo';
import { CardInfo } from '../../parts/CardInfo';
import { ButtonTrasnparent } from '../../parts/ButtonTrasnparent';

import { styles } from './styles';
import { THEME } from '../../../theme';
import logoRamonoliveira from '../../../assets/img/logoRamonoliveira.png'

// Configuração do texto para convidar amigos
const onShare = async () => {
    try {
        const result = await Share.share({
            message:
                'Ei, achei esse App maneiro para ajudar a se livrar do consumo de conteúdo explício. Vou te mandar o link: LINKAQUI!!!!!',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error: any) {
        alert(error.message);
    }
};

// Configuração do alerta de funcionalidade indisponível
const alertaFuncionalidadeIndisponivel = () =>
    Alert.alert('Funcionalidade indisponível',
        'Esta funcionalidade ainda não está disponível nesta versão do App, aguarde as próximas atualizações.', [
        {
            text: 'Entendi', style: 'cancel',
        }
    ]);

export function Configuracoes() {
    const { signOut, user } = useContext(AuthContext)

    async function copyToClipboard() {
        await Clipboard.setStringAsync(user.id);
    };

    return (
        <View style={styles.container}>
            <Titulo
                title='Configurações'
            >
                <Ionicons name="settings-outline" size={24} color={THEME.COLORS.PRIMARY} />
            </Titulo>

            <ScrollView style={styles.scrollViewContainer}>
                <CardInfo
                    title='Cadastrar PIN'
                    description='Cadastre um PIN para abrir o aplicativo'
                >
                    <Ionicons name="ios-key-outline" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo
                    title='Apagar meus dados'
                    description='Solicite que todos os seus dados sejam apagados permanentemente'
                >
                    <MaterialIcons name="privacy-tip" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>


                <CardInfo
                    title='Convidar amigos'
                    description="Compartilhe o App “Let's!” com seus amigos"
                    onPress={() => { onShare() }}
                >
                    <Ionicons name="people-outline" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo
                    title='Tema'
                    description="Alterne entre os temas 'Light' e 'Dark'"
                    onPress={() => { alertaFuncionalidadeIndisponivel() }}
                >
                    <MaterialCommunityIcons name="theme-light-dark" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>
            </ScrollView>

            <TouchableOpacity onPress={() => copyToClipboard()} style={{ marginBottom: 16 }}>
                <Text style={{ color: THEME.COLORS.SEMANTIC_2 }}>Id: {user.id}</Text>
            </TouchableOpacity>
            <ButtonTrasnparent value='Sair' onPress={() => signOut()} />

            <TouchableOpacity style={styles.developerArea} onPress={() => {
                Linking.openURL('https://ramonoliveira.dev');
            }}>
                <Text style={styles.developerAreaText}>Desenvolvido por</Text>
                <View style={styles.logoArea}>
                    <Image source={logoRamonoliveira} style={styles.logoRamonoliveira} />
                    <Text style={styles.developerLogoText}>ramonoliveira.dev</Text>
                </View>
            </TouchableOpacity>


        </View>
    );
}



