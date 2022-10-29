import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share, Image, Linking, Alert, Switch, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../../../contexts/auth';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { Titulo } from '../../../parts/Titulo';
import { CardInfo } from '../../../parts/CardInfo';

import { styles } from './styles';
import { THEME } from '../../../../theme';
import { ButtonMedium } from '../../../parts/ButtonMedium';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    Alert.alert('Funcionalidade em desenvolvimento.',
        'Esta funcionalidade ainda não está disponível nesta versão do App, aguarde as próximas atualizações.', [
        {
            text: 'Entendi', style: 'cancel',
        }
    ]);

export function Main() {
    const { isLocalAuthenticationRequired, signOut, setIsLocalAuthenticationRequired, themeMode, setThemeMode } = useContext(AuthContext)

    const navigation = useNavigation()

    const [isLoadingToggleLocalAuth, setIsLoadingToggleLocalAuth] = useState<boolean>(false)

    async function toggleSwitch() {
        setIsLoadingToggleLocalAuth(true)
        await AsyncStorage.setItem('@lets:is_local_authentication_required', JSON.stringify(!isLocalAuthenticationRequired))
        setIsLocalAuthenticationRequired(previousState => !previousState)
        setIsLoadingToggleLocalAuth(false)
    };

    async function toggleThemeMode(themeMode: 'DARK' | 'LIGHT') {
        alertaFuncionalidadeIndisponivel()
        setThemeMode(themeMode)
        await AsyncStorage.setItem('@lets:theme_mode', themeMode)
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
                    title='Meus dados'
                    description='Visualize e altere seus dados'
                    onPress={() => navigation.navigate('MeusDados')}
                >
                    <Ionicons name="person-outline" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <View style={styles.CardInfoContainer}>

                    <View style={{ flex: 1 }}>
                        <CardInfo
                            title="Solicitar digital ou PIN"
                            description='Ative a solicitação de sua digital ou PIN ao entrar no App'
                        >
                            <Ionicons name="finger-print-outline" size={32} color={THEME.COLORS.TEXT} />
                        </CardInfo>
                    </View>
                    <View style={styles.switchContainer}>
                        {isLoadingToggleLocalAuth ?
                            (<ActivityIndicator color={THEME.COLORS.TEXT} size={THEME.FONT_SIZE.LG} />)
                            :
                            (<Switch
                                trackColor={{ false: THEME.COLORS.NEUTRAL_4, true: THEME.COLORS.NEUTRAL_3 }}
                                thumbColor={isLocalAuthenticationRequired ? THEME.COLORS.SUCCESS : THEME.COLORS.NEUTRAL_2}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isLocalAuthenticationRequired}
                            />)
                        }
                    </View>
                </View>



                {/*
                <CardInfo
                    title='Apagar meus dados'
                    description='Solicite que todos os seus dados sejam apagados permanentemente'
                >
                    <MaterialIcons name="privacy-tip" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo> 
                */}

                <View style={styles.CardInfoContainer}>
                    <View style={{ flex: 1 }}>
                        <CardInfo onPress={() => alertaFuncionalidadeIndisponivel()} title='Tema' description="Alterne entre os temas 'Light' e 'Dark'">
                            <MaterialCommunityIcons name="theme-light-dark" size={32} color={THEME.COLORS.TEXT} />
                        </CardInfo>
                    </View>
                    <View style={styles.switchContainer}>
                        <TouchableOpacity onPress={() => toggleThemeMode('DARK')} style={{ ...styles.toggleThemeButton, ...styles.toggleThemeButtonDark, opacity: (themeMode === 'DARK' ? 1 : .25) }}>
                            <Ionicons name="moon-sharp" size={16} color={THEME.COLORS.NEUTRAL_1} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleThemeMode('LIGHT')} style={{ ...styles.toggleThemeButton, ...styles.toggleThemeButtonLight, opacity: (themeMode === 'LIGHT' ? 1 : .25) }}>
                            <Ionicons name="sunny-sharp" size={16} color={THEME.COLORS.BLACK} />
                        </TouchableOpacity>
                    </View>
                </View>

                <CardInfo
                    title='Convidar amigos'
                    description="Compartilhe o App “Let's!” com seus amigos"
                    onPress={() => { onShare() }}
                >
                    <Ionicons name="people-outline" size={32} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <View style={{ marginTop: 32 }}>
                    <ButtonMedium
                        color={THEME.COLORS.DANGER}
                        value='Sair da conta'
                        onPress={() => signOut()} />
                </View>
            </ScrollView>


            <TouchableOpacity style={styles.developerArea} onPress={() => {
                Linking.openURL('https://ramonoliveira.dev');
            }}>
                <Text style={styles.developerAreaText}>Desenvolvido por</Text>
                <View style={styles.logoArea}>
                    <Image source={require('../../../../assets/img/logoRamonoliveira.png')} style={styles.logoRamonoliveira} />
                    <Text style={styles.developerLogoText}>ramonoliveira.dev</Text>
                </View>
            </TouchableOpacity>


        </View>
    );
}



