import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';

import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import { Titulo } from '../../parts/Titulo';
import { ModalShort } from '../../parts/ModalShort';
import { ButtonMedium } from '../../parts/ButtonMedium';
import { ButtonTrasnparent } from '../../parts/ButtonTrasnparent';

import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../../theme';

import niveis from '../../../utils/ranking';

export function Pontuacao() {
    const ref = useRef<any>(null)

    function handleScreenshot() {
        setShowBorderOnScreenshot(true)
        captureRef(ref)
            .then(async uri => {
                console.log('Image saved to', uri);
                await Sharing.shareAsync(uri);
            })
            .catch(error => console.error('Oops, snapshot failed', error))
            .finally(() => { setShowBorderOnScreenshot(false) })
    }

    const [nivelNow, setNivelNow] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30>(1)
    const [showBorderOnScreenshot, setShowBorderOnScreenshot] = useState<boolean>(false)
    const [showScoreModal, setShowScoreModal] = useState<boolean>(false)

    return (
        <View style={styles.container}>
            <Titulo
                title='Pontuação'
                subtitle='Vamos tornar sua evolução mais divertida. Confira abaixo sua patente dentro no nosso ranking ;)'
            >
                <Ionicons name="medal-outline" size={24} color={THEME.COLORS.PRIMARY} />
            </Titulo>

            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.infoButton} onPress={() => { setShowScoreModal(true) }}>
                    <Ionicons name="information-circle-outline" size={THEME.FONT_SIZE.LG} color={THEME.COLORS.SEMANTIC_2} />
                </TouchableOpacity>
                <ViewShot ref={ref} options={{ format: "jpg", quality: 0.9 }}>
                    <View style={[styles.content, (showBorderOnScreenshot && styles.patenteScreenshotStyle)]}>
                        <View
                            style={styles.patenteArea}
                        >
                            <Image
                                source={niveis[`nivel_${nivelNow}`].img}
                                style={styles.patenteImage}
                            />
                            <Text style={styles.patentSlug}>
                                {niveis[`nivel_${nivelNow}`].slug}
                            </Text>

                            <Text style={styles.patenteDescription}>
                                {niveis[`nivel_${nivelNow}`].descrition}
                            </Text>
                        </View>
                        <View style={styles.pointsArea}>
                            <Text style={[styles.text, { fontSize: THEME.FONT_SIZE.LG }]}><Text style={styles.bold}>00</Text> ponto(s)</Text>
                        </View>
                    </View>
                </ViewShot>

                <View style={styles.pointsArea}>
                    <Text style={[styles.text, styles.center]}>Faltam 00 pontos para o próximo nível, continue na batalha para as próximas conquistas.</Text>
                </View>

                <View style={styles.buttonArea}>
                    <ButtonTrasnparent value='Compartilhar' onPress={() => handleScreenshot()}>
                        <Ionicons name="ios-share-social-outline" size={24} color={THEME.COLORS.TEXT} />
                    </ButtonTrasnparent>
                </View>
            </ScrollView>

            <ModalShort
                handleModal={setShowScoreModal}
                modalVisible={showScoreModal}
            >
                <Titulo title='Cálculo da pontuação' subtitle='Veja como os pontos são calculados.'>
                    <Ionicons name="medal-outline" size={24} color={THEME.COLORS.PRIMARY} />
                </Titulo>

                <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.text}>Escrever aqui como o cálculo da pontação é realizado.</Text>
                    <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure saepe quos praesentium eos labore cum quam sunt odit tempora. Repellat sed corrupti assumenda laudantium. Asperiores dicta quaerat quibusdam aliquid repudiandae.</Text>
                </ScrollView>
            </ModalShort>
        </View>
    );
}