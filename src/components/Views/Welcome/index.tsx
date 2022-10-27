import React, { useContext } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { styles } from './styles'
import { ButtonLarge } from '../../parts/ButtonLarge';

import { AuthContext } from '../../../../src/contexts/auth';
import logo from '../../../assets/img/icon.png';
import { LinearGradient } from 'expo-linear-gradient';

interface ModalWelcomeProps {
    handleModal: (arg: boolean) => void;
}

export function Welcome({ handleModal }: ModalWelcomeProps) {
    const background = require('../../../assets/img/background-welcome.jpg');
    const { logged, setLogged }: any = useContext(AuthContext)

    return (
        <ImageBackground
            source={background}
            resizeMode="cover"
            style={styles.container}
        >

            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logoImg} />
                <Text style={styles.logoText}>Let's!</Text>
            </View>

            <View style={styles.main}>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={styles.linearGradient}
                >
                    <Text style={[styles.text, styles.textBemvindo]}>Bem-vindo!</Text>
                    <Text style={[styles.text, styles.textApresentacao]}>
                        Para quem ainda não me conhece, sou <Text style={styles.strong}>Letícia Balducci</Text>, especialista em sexualidade humana. O <Text style={styles.strong}>Let's!</Text> foi desenvolvido para te ajudar no rompimento com o hábito de consumo de conteúdo explícito. Clique em “continuar” e entraremos juntos nessa batalha para te livrar, definitivamente, desse mau hábito.
                    </Text>
                    <ButtonLarge value="Continuar" onPress={() => handleModal(false)} />
                </LinearGradient>
            </View>

        </ImageBackground>
    )
}
