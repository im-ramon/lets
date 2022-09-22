import React from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { Titulo } from '../../parts/Titulo';
import { ButtonMedium } from '../../parts/ButtonMedium';

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

export function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.navMenu}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logoImg} />
                    <Text style={styles.logoText}>Let's</Text>
                </View>

                <View style={styles.pontosContainer}>
                    <Text style={styles.pontosText}>00 pontos</Text>
                </View>
            </View>

            <View style={styles.apresentacaoApp}>
                <Text style={styles.boasvindasTextH1}>Olá, usuário,</Text>
                <Text style={styles.boasvindasTextP}>Bem vindo ao app Let's. Por aqui você pode acompanhar o resumo do andamento da sua jornada longe do consumo de conteúdo explícito.</Text>
            </View>

            <View style={styles.contadorEvolucao}>
                <Titulo content='Seu progresso'>
                    <FontAwesome5 name="chart-line" size={THEME.FONT_SIZE.LG} color="white" />
                </Titulo>

                <View style={styles.contadorEvolucao}></View>

                <ContributionGraph
                    // LEMBRAR: Configurar com atenção as propiedades do gráfico
                    tooltipDataAttrs={(value) => handleToolTip}
                    values={commitsData}
                    endDate={new Date()}
                    numDays={90}
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
                <ButtonMedium value='Reiniciar contador' onPress={() => console.log('ButtonMedium')}>
                    <MaterialCommunityIcons name="calendar-refresh-outline" size={24} color="white" />
                </ButtonMedium>
            </View>
        </View >
    );
}



