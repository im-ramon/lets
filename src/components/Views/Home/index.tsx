import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";

import { Titulo } from '../../parts/Titulo';
import { styles } from './styles';


const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
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

const handleToolTip: any = {}

export function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.contadorArea}>
                <View style={styles.contadorHeader}>
                    <Titulo content='Seu histório dos últimos noventa dias'></Titulo>
                </View>
                <View style={styles.contadorBody}>
                    <ContributionGraph
                        tooltipDataAttrs={(value) => handleToolTip}
                        values={commitsData}
                        endDate={new Date()}
                        numDays={90}
                        width={screenWidth}
                        height={220}
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
                </View>
                <View style={styles.contadorLegend}>
                    <Text style={styles.contadorLegendText}>Você está 00 anos 00 meses 00 dias </Text>
                </View>

            </View>
        </View>
    );
}



