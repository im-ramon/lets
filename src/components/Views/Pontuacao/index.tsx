import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import { Titulo } from '../../parts/Titulo';
import { ModalShort } from '../../parts/ModalShort';
import { ButtonTrasnparent } from '../../parts/ButtonTrasnparent';
import { AppContext } from '../../../contexts/app';
import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../../theme';
import niveis from '../../../utils/ranking';
import consoleFeedback from '../../../utils/consoleConfig';
import { MotiImage, useAnimationState } from 'moti/build';
import moment from 'moment';

export function Pontuacao() {
    const ref = useRef<any>(null)
    const { score, isLoading, lastScoreUpdate, handleAlterScore } = useContext(AppContext)

    const wasThisRequestOneDayAfterTheLastRequest = moment().isAfter(lastScoreUpdate, 'day');

    const [nivelNow, setNivelNow] = useState<number>(0)
    const [diffPointsToNextLevel, setDiffPointsToNextLevel] = useState<number>(0)
    const [showBorderOnScreenshot, setShowBorderOnScreenshot] = useState<boolean>(false)
    const [showScoreModal, setShowScoreModal] = useState<boolean>(false)

    const toggleAnimate = useAnimationState({
        first: {
            translateY: -128
        },
        secound: {
            translateY: 0
        }
    })

    function handleScreenshot() {
        setShowBorderOnScreenshot(true)
        captureRef(ref)
            .then(async uri => {
                consoleFeedback('info', 'handleScreenshot', `Imagem salva no seguinte diretório: ${uri}`)
                await Sharing.shareAsync(uri);
            })
            .catch(error => consoleFeedback('error', 'handleScreenshot', error))
            .finally(() => { setShowBorderOnScreenshot(false) })
    }

    function checkNivel() {
        const infoNivelNow = niveis.filter(el => el.pontos <= score).slice(-1)[0]

        if (nivelNow != infoNivelNow.nivel) {

            toggleAnimate.transitionTo('secound')

            setTimeout(() => {
                toggleAnimate.transitionTo('first')
                setNivelNow(infoNivelNow.nivel)
            }, 50);

            setTimeout(() => {
                toggleAnimate.transitionTo('secound')
            }, 700);
        }
    }

    function searchDiffPointsToNextLevel() {
        if (nivelNow == 30) {
            setDiffPointsToNextLevel(0)
            return;
        }
        const diffPoints = (niveis[nivelNow + 1].pontos) - score
        setDiffPointsToNextLevel(diffPoints)
    }

    useEffect(() => {
        checkNivel()
        searchDiffPointsToNextLevel()
    }, [score, nivelNow])

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
                            <MotiImage
                                state={toggleAnimate}
                                source={niveis[nivelNow].img}
                                style={styles.patenteImage}
                            />
                            <Text style={styles.patentSlug}>
                                {niveis[nivelNow].slug}
                            </Text>

                            <Text style={styles.patenteDescription}>
                                {niveis[nivelNow].description}
                            </Text>
                        </View>
                        <View style={styles.pointsArea}>
                            <Text style={[styles.text, { fontSize: THEME.FONT_SIZE.LG }]}><Text style={styles.bold}>{score}</Text> ponto{score === 1 ? '' : 's'}</Text>
                        </View>
                    </View>
                </ViewShot>

                <View style={styles.pointsArea}>
                    <Text style={[styles.text, styles.center]}>Faltam {diffPointsToNextLevel} ponto{diffPointsToNextLevel === 1 ? '' : 's'} para o próximo nível, continue na batalha para alcançar as próximas conquistas.</Text>
                </View>

                <View style={styles.buttonArea}>
                    <ButtonTrasnparent value='Receber pontos' badge={wasThisRequestOneDayAfterTheLastRequest ? '1' : null} onPress={() => handleAlterScore('add')}>
                        {isLoading ?
                            (<ActivityIndicator size={25} color={THEME.COLORS.TEXT} />)
                            :
                            (<Ionicons name="add-circle-outline" size={24} color={THEME.COLORS.TEXT} />)
                        }
                    </ButtonTrasnparent>
                </View>
            </ScrollView>

            <ModalShort
                handleModal={setShowScoreModal}
                modalVisible={showScoreModal}
            >
                <Titulo title='Cálculo da pontuação' subtitle='Veja como os pontos são calculados:'>
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