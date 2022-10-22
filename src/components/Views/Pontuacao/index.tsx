import React, { useState, useRef, useContext } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';

import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import { Titulo } from '../../parts/Titulo';
import { ModalShort } from '../../parts/ModalShort';
import { ButtonMedium } from '../../parts/ButtonMedium';
import { ButtonTrasnparent } from '../../parts/ButtonTrasnparent';
import { AppContext } from '../../../contexts/app';
import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../../theme';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import niveis from '../../../utils/ranking';
import { api } from '../../../services/api';

export function Pontuacao() {
    const ref = useRef<any>(null)
    const { score, handleAlterScore } = useContext(AppContext)

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
                <View style={styles.buttonsHeader}>
                    <TouchableOpacity style={styles.infoButton} onPress={() => { handleScreenshot() }}>
                        <Ionicons name="ios-share-social-outline" size={THEME.FONT_SIZE.LG} color={THEME.COLORS.SEMANTIC_2} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoButton} onPress={() => { setShowScoreModal(true) }}>
                        <Ionicons name="information-circle-outline" size={THEME.FONT_SIZE.LG} color={THEME.COLORS.SEMANTIC_2} />
                    </TouchableOpacity>
                </View>
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
                            <Text style={[styles.text, { fontSize: THEME.FONT_SIZE.LG }]}><Text style={styles.bold}>{score}</Text> ponto(s)</Text>
                        </View>
                    </View>
                </ViewShot>

                <View style={styles.pointsArea}>
                    <Text style={[styles.text, styles.center]}>Faltam 00 pontos para o próximo nível, continue na batalha para as próximas conquistas.</Text>
                </View>

                <View style={styles.buttonArea}>
                    <ButtonTrasnparent value='Receber pontos' onPress={() => handleAlterScore('sub')}>
                        <Ionicons name="add-circle-outline" size={24} color={THEME.COLORS.TEXT} />
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

                <ScrollView style={styles.scoreInformationscrollView}>
                    <Text style={styles.scoreInformationText}>
                        <Ionicons name="checkmark-circle-outline" size={THEME.FONT_SIZE.MD} color={THEME.COLORS.SUCCESS} /> 1 dia sem consumo: <Text style={styles.bold}>+ 5 pontos</Text>
                    </Text>

                    <Text style={styles.scoreInformationText}>
                        <Ionicons name="md-sad-outline" size={THEME.FONT_SIZE.MD} color={THEME.COLORS.DANGER} /> Recaída: <Text style={styles.bold}>- 40 pontos</Text>
                    </Text>

                    <Text style={styles.scoreInformationSubtitle}>
                        <Text style={styles.text}>- Os pontos devem ser resgatados diariamente nesta página.</Text>
                    </Text>
                    <Text style={styles.text}>- A pontuação é calculada a partir da data de cadastro do usuário, mesmo que insira uma data passada, os pontos não serão computados.</Text>
                </ScrollView>
            </ModalShort>
        </View>
    );
}