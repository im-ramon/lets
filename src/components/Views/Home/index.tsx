import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";

import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { Titulo } from '../../parts/Titulo';
import { ButtonMedium } from '../../parts/ButtonMedium';
import { ModalShort } from '../../parts/ModalShort';

import { styles } from './styles';
import { THEME } from '../../../theme';

import logo from '../../../assets/img/icon.png';

// Cofigurações do gráfico
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: THEME.COLORS.BACKGROUND_1,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: THEME.COLORS.BACKGROUND_1,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(193, 81, 71, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const commitsData = [
    { date: "2022-01-02", count: 0 },
    { date: "2022-01-03", count: 0 },
    { date: "2022-01-04", count: 0 },
    { date: "2022-01-05", count: 0 },
    { date: "2022-01-06", count: 5 },
    { date: "2022-01-30", count: 2 },
    { date: "2022-07-31", count: 3 },
    { date: "2022-07-01", count: 2 },
    { date: "2022-07-02", count: 4 },
    { date: "2022-03-05", count: 2 },
    { date: "2022-08-02", count: 2 },
    { date: "2022-08-03", count: 3 },
    { date: "2022-08-04", count: 2 },
    { date: "2022-02-30", count: 4 },
    { date: "2022-09-20", count: 4 },
    { date: "2022-09-01", count: 4 },
    { date: "2021-10-10", count: 4 },
];


// Skiping no erro de tipagem no gráfico
const handleToolTip: any = {}
// --- End

export function Home() {

    const [showChartSubtitle, setShowChartSubtitle] = useState<boolean>(false);
    const [dedicationShortPress, setDedicationShortPress] = useState<number>(0);
    const [dedicationLongPress, setDedicationLongPress] = useState<number>(0);
    const [showDedicationModal, setShowDedicationModal] = useState<boolean>(false);

    // Controla a exibição do modal de dedicatória
    useEffect(() => {
        if (dedicationLongPress == 4 && dedicationShortPress == 4) {
            setShowDedicationModal(true)
        }
    }, [dedicationLongPress, dedicationShortPress])

    const handleDedication = (modalActive: boolean) => {
        setDedicationShortPress(0);
        setDedicationLongPress(0);
        setShowDedicationModal(modalActive);
    }
    // --- End

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <View style={styles.navMenu}>
                    <TouchableOpacity
                        onPress={() => setDedicationShortPress(dedicationShortPress + 1)}
                        onLongPress={() => setDedicationLongPress(dedicationLongPress + 1)}
                        style={styles.logoContainer}
                    >
                        <Image source={logo} style={styles.logoImg} />
                        <Text style={styles.logoText}>Let's</Text>
                    </TouchableOpacity>

                    <View style={styles.pontosContainer}>
                        <Text style={styles.pontosText}> 0 pontos</Text>
                    </View>
                </View>

                <View style={styles.bloco}>
                    <Text style={styles.boasvindasTextH1}>Olá, usuário!</Text>
                </View>

                <View style={[styles.graficoEvolucao, styles.bloco]}>
                    <TouchableOpacity style={styles.shareButton} >
                        <Ionicons name="ios-share-social-outline" size={24} color={THEME.COLORS.TEXT} />
                    </TouchableOpacity>

                    <Titulo title='Evolução' subtitle='Esse é gráfico do seu progresso nos últimos noventa dias, tente mantê-lo o mais limpo possível.'>
                        <FontAwesome5 name="chart-line" size={THEME.FONT_SIZE.LG} color={THEME.COLORS.PRIMARY} />
                    </Titulo>

                    <ContributionGraph
                        // LEMBRAR: Configurar com atenção as propiedades do gráfico
                        tooltipDataAttrs={(value) => handleToolTip}
                        values={commitsData}
                        endDate={new Date()}
                        numDays={93}
                        width={screenWidth}
                        height={260}
                        chartConfig={chartConfig}
                        style={styles.chart}
                        getMonthLabel={(monthIndex: number) => {
                            switch (monthIndex) {
                                case 0: {
                                    return 'Jan'
                                    break;
                                }
                                case 1: {
                                    return 'Fev'
                                    break;
                                }
                                case 2: {
                                    return 'Mar'
                                    break;
                                }
                                case 3: {
                                    return 'Abr'
                                    break;
                                }
                                case 4: {
                                    return 'Mai'
                                    break;
                                }
                                case 5: {
                                    return 'Jun'
                                    break;
                                }
                                case 6: {
                                    return 'Jul'
                                    break;
                                }
                                case 7: {
                                    return 'Ago'
                                    break;
                                }
                                case 8: {
                                    return 'Set'
                                    break;
                                }
                                case 9: {
                                    return 'Out'
                                    break;
                                }
                                case 10: {
                                    return 'Nov'
                                    break;
                                }
                                case 11: {
                                    return 'Dez'
                                    break;
                                }
                                default: {
                                    return 'Month'
                                    break;
                                }
                            }
                        }}
                        squareSize={24}
                        onDayPress={(day) => { console.log(day.date) }} // LEMBRAR: Colocar alert aqui para avisar a data.
                    />

                    {showChartSubtitle && (
                        <TouchableOpacity
                            onPress={() => setShowChartSubtitle(false)}
                            style={styles.graficoEvolucaoSubtitleArea}
                        >
                            <View style={[styles.graficoEvolucaoSubtitleItem, { marginRight: 32 }]}>
                                <FontAwesome5 name="square-full" size={18} color={THEME.COLORS.PRIMARY + 50} />
                                <Text style={styles.graficoEvolucaoText}>Período sem consumo</Text>
                            </View>
                            <View style={styles.graficoEvolucaoSubtitleItem}>
                                <FontAwesome5 name="square-full" size={18} color={THEME.COLORS.PRIMARY} />
                                <Text style={styles.graficoEvolucaoText}>Recaídas</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    {!showChartSubtitle && (
                        <TouchableOpacity
                            style={styles.helpArea}
                            onPress={() => setShowChartSubtitle(true)}
                        >
                            <FontAwesome5 name="question-circle" size={18} color={THEME.COLORS.PRIMARY} />
                            <Text style={styles.helpAreaText}>Exibir legenda</Text>
                        </TouchableOpacity>
                    )}

                </View>

                <View style={[styles.contadorEvolucao, styles.bloco]}>
                    {/* LEMBRAR: Colocar aqui um texto dinâminco, entre as "aspas" */}
                    <Text style={styles.contadorEvolucaoHeader}>Tempo "em liberdade"</Text>
                    <Text style={styles.contadorEvolucaoText}>
                        <Text style={styles.contadorEvolucaoTextbold}>00</Text> a <Text style={styles.contadorEvolucaoTextGrey}>|</Text>
                        <Text style={styles.contadorEvolucaoTextbold}> 00</Text> m <Text style={styles.contadorEvolucaoTextGrey}>|</Text>
                        <Text style={styles.contadorEvolucaoTextbold}> 00</Text> d <Text style={styles.contadorEvolucaoTextGrey}> . </Text>
                        <Text style={styles.contadorEvolucaoTextbold}> 00</Text> h <Text style={styles.contadorEvolucaoTextGrey}>:</Text>
                        <Text style={styles.contadorEvolucaoTextbold}> 00</Text> m <Text style={styles.contadorEvolucaoTextGrey}>:</Text>
                        <Text style={styles.contadorEvolucaoTextbold}> 00</Text> s
                    </Text>
                </View>


                <ButtonMedium value='Reiniciar contador' onPress={() => console.log('ButtonMedium')}>
                    <MaterialCommunityIcons name="calendar-refresh-outline" size={24} color="white" />
                </ButtonMedium>
            </View>

            <ModalShort
                header='Dedicatória'
                modalVisible={showDedicationModal}
                handleModal={handleDedication}
            >
                <Text style={styles.textDedicatoria}>
                    Esse App é um presente de um fã que admira muito o seu trabalho.
                </Text>
            </ModalShort>
        </ScrollView>
    );
}



