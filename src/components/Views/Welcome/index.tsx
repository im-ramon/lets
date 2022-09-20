import { View, Text, ImageBackground } from 'react-native'
import { styles } from './styles'
import ButtonLarge from '../../parts/ButtonLarge';

export function Welcome() {
    const background = require('../../../assets/background-welcome.jpg');

    return (
        <ImageBackground
            source={background}
            resizeMode="cover"
            style={styles.container}
        >
            <View style={styles.main}>
                <Text style={[styles.text, styles.textBemvindo]}>Bem-vindo!</Text>
                <Text style={[styles.text, styles.textApresentacao]}>
                    Escrever aqui uma breve introdução sobre a idealizadora. Fazer um breve convite para utilizar o App com a descrição de algumas funcionalidades/ benefícios.
                </Text>
                <ButtonLarge value="Continuar" />
            </View>

        </ImageBackground>
    )
}
