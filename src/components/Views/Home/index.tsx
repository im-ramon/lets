import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, Alert, TextInput, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import { ContributionGraph } from "react-native-chart-kit";
import moment, { min } from 'moment';

import { AppContext } from '../../../contexts/app';
import { AuthContext } from '../../../contexts/auth';

import { api } from '../../../services/api';

import logo from '../../../assets/img/icon.png';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { FieldAreaStyled, FormStyled, InputStyled, LabelStyled, TextAreaStyled, DatePickerStyledContainer } from '../../parts/_SytyledComponents'
import { Titulo } from '../../parts/Titulo';
import { ButtonMedium } from '../../parts/ButtonMedium';
import { ModalDedication } from '../../parts/ModalDedication';
import { ModalShort } from '../../parts/ModalShort';
import { ModalFull } from '../../parts/ModalFull';
import { styles } from './styles';

import { THEME } from '../../../theme';
import { formRules } from '../../../utils/formRules';


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
    { date: "2022-09-01", count: 1 },
    { date: "2022-08-01", count: 1 },
    { date: "2022-07-01", count: 1 },
    { date: "2022-07-05", count: 1 },
    { date: "2022-06-30", count: 1 },
    { date: "2022-06-26", count: 1 },
];
// --- Fim

// Skiping no erro de tipagem no gráfico
const handleToolTip: any = {}
// --- Fim

export function Home() {

    const { user, vibrate } = useContext(AuthContext)
    const {
        lastConsumption,
        recordNoConsumption,
        totalRelapse,
        score,
        relapseReasons,
        relapseDates,
        firstTimeInApp,
        setLastConsumption,
        setRecordNoConsumption,
        setTotalRelapse,
        setScore,
        setRelapseReasons,
        setRelapseDates,
        setFirstTimeInApp,
    } = useContext(AppContext)

    // Configuração do Screeshot do gráfico
    const ref = useRef<any>(null)
    function handleScreenshot() {
        setWaitingScreenshot(true)
        setShowChartSubtitle(true)
        captureRef(ref)
            .then(async uri => {
                console.log('Image saved to', uri);
                await Sharing.shareAsync(uri);
            })
            .catch(error => console.error('Oops, snapshot failed', error))
            .finally(() => {
                setWaitingScreenshot(false)
                setShowChartSubtitle(false)
            })
    }
    const [waitingScreenshot, setWaitingScreenshot] = useState<boolean>(false)
    // --- Fim


    // States do component
    const [showChartSubtitle, setShowChartSubtitle] = useState<boolean>(false);
    const [dedicationShortPress, setDedicationShortPress] = useState<number>(0);
    const [dedicationLongPress, setDedicationLongPress] = useState<number>(0);
    const [showDedicationModal, setShowDedicationModal] = useState<boolean>(false);
    const [showQuestionsModal, setShowQuestionsModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // --- Fim


    // Configurações do Cronometro
    type timerDataProps = {
        anos: number | string;
        meses: number | string;
        dias: number | string;
        horas: number | string;
        minutos: number | string;
        segundos: number | string;
    }

    const [timerData, setTimerData] = useState<timerDataProps>({ anos: 0, meses: 0, dias: 0, horas: 0, minutos: 0, segundos: 0 })

    function stopwatchCalculations() {
        const anos = moment().diff(lastConsumption, 'years');
        const meses = moment().diff(moment(lastConsumption).add(anos, 'years'), 'months')
        const dias = moment().diff(moment(lastConsumption).add(anos, 'years').add(meses, 'months'), 'days')
        const horas = moment().diff(moment(lastConsumption).add(anos, 'years').add(meses, 'months').add(dias, 'days'), 'hours')
        const minutos = moment().diff(moment(lastConsumption).add(anos, 'years').add(meses, 'months').add(dias, 'days').add(horas, 'hours'), 'minutes')
        const segundos = moment().diff(moment(lastConsumption).add(anos, 'years').add(meses, 'months').add(dias, 'days').add(horas, 'hours').add(minutos, 'minutes'), 'seconds')

        setTimerData({
            anos,
            meses,
            dias,
            horas,
            minutos,
            segundos
        })

    }

    function startStopwatch() {
        if (lastConsumption !== 'lastConsumption') {
            setInterval(() => {
                stopwatchCalculations()
            }, 1000)
        }
    }

    useEffect(() => {
        startStopwatch()
    }, [lastConsumption])
    // --- Fim


    // Configurações do Calendário Picker
    const [dateLastConsumption, setDateLastConsumption] = useState<Date>(new Date());
    const [timeLastConsumption, setTimeLastConsumption] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setShowDatePicker(false);

        if (moment(currentDate).isAfter(new Date())) {
            Alert.alert(
                'Escolha uma data válida.',
                `Não são permitidas datas no futuro. \nVocê selecionou a data: ${moment(currentDate).format('DD/MM/YYYY')}`,
                [{
                    text: 'Fechar', style: 'cancel',
                }]
            )

            setDateLastConsumption(new Date());
            return
        }

        setDateLastConsumption(currentDate);
    };

    const onChangeTime = (event: any, selectedTime: any) => {
        const currentTime = selectedTime;
        setShowTimePicker(false);
        setTimeLastConsumption(currentTime);
    };
    // --- Fim


    // States do formulário para reiniciar.
    const [reiniciarMotivo, setReiniciarMotivo] = useState<string>('');
    const [reiniciarComentario, setReiniciarComentario] = useState<string>('');
    // --- Fim


    // Controla a exibição do modal de dedicatória
    useEffect(() => {
        if (dedicationLongPress == 4 && dedicationShortPress == 4) {
            vibrate('success');
            setShowDedicationModal(true)
        }
    }, [dedicationLongPress, dedicationShortPress])

    const handleDedication = (modalActive: boolean) => {
        setDedicationShortPress(0);
        setDedicationLongPress(0);
        setShowDedicationModal(modalActive);
    }
    // --- Fim


    // Criar o alerta ao clicar em uma data
    interface AlertPros {
        count: number | string;
        date: Date;
    }
    const alertaDataClicada = (ocorrencia: AlertPros) => {
        const data = new Date(ocorrencia.date)
        const dataFormatada = `${data.getUTCDate().toString().padStart(2, '0')}/${(data.getUTCMonth() + 1).toString().padStart(2, '0')}/${data.getUTCFullYear()}`;
        const houveConsumo = ocorrencia.count != 0;

        Alert.alert(`Dia ${dataFormatada}`,
            houveConsumo ? 'Nessa data você fez o consumo de conteúdo explícito.' : 'Não há registro de consumo de conteúdo explícito nessa data. Continue assim!', [
            {
                text: 'Fechar', style: 'cancel',
            }
        ]);
    }
    // --- Fim

    const userNameEdited = (userName: string) => {
        let name = userName.split(' ')
        return name[0]
    }

    async function startExternaladnLocalUserData() {
        setIsLoading(true)
        const data = moment(dateLastConsumption).format('YYYY-MM-DD') + "T" + moment(timeLastConsumption).format('HH:mm:ss') + "-03:00"
        try {
            await api.post('/user_data', {
                last_consumption: data,
                record_no_consumption: 0,
                total_relapse: 0,
                score: 0,
                relapse_reasons: '-',
                relapse_dates: '-'
            })

            setLastConsumption(data)
            setRecordNoConsumption(0)
            setTotalRelapse(0)
            setScore(0)
            setRelapseReasons('-')
            setRelapseDates('-')
        } catch (e) {
            console.log('startExternalUserData | Erro: ', e)
        }
        setIsLoading(false)
    }

    function handleSetUserExternalAndLocalData() {
        startExternaladnLocalUserData()
        setFirstTimeInApp(false)
    }


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
                        <Text style={styles.logoText}>Let's!</Text>
                    </TouchableOpacity>

                    <View style={styles.pontosContainer}>
                        <Text style={styles.pontosText}> {score} ponto(s)</Text>
                    </View>
                </View>

                <View style={styles.bloco}>
                    <Text style={styles.boasvindasTextH1}>Olá, {userNameEdited(user.name)}!</Text>
                    {/* Futuramente isso pode causara um estouro na memória por renderizar muitas vezes */}
                </View>

                <ViewShot style={{ ...styles.bloco, ...styles.viewShotStyle }} ref={ref} options={{ format: "jpg", quality: 0.9 }}>
                    <View style={[styles.graficoEvolucao, styles.bloco]}>

                        {!waitingScreenshot && (
                            <TouchableOpacity style={styles.shareButton} onPress={() => handleScreenshot()} >
                                <Ionicons name="ios-share-social-outline" size={24} color={THEME.COLORS.TEXT} />
                            </TouchableOpacity>
                        )}

                        <Titulo title='Evolução' subtitle='Esse é o gráfico do seu progresso nos últimos noventa dias sem conteúdo explíto, tente mantê-lo o mais limpo possível.'>
                            <FontAwesome5 name="chart-line" size={THEME.FONT_SIZE.LG} color={THEME.COLORS.PRIMARY} />
                        </Titulo>

                        <ContributionGraph
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
                            onDayPress={(info) => { alertaDataClicada(info); }}
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
                                    <Text style={styles.graficoEvolucaoText}>Recaída</Text>
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
                        <Text style={styles.contadorEvolucaoHeader}>Tempo “em liberdade”</Text>
                        <Text style={styles.contadorEvolucaoText}>
                            <Text style={styles.contadorEvolucaoTextbold}>{timerData.anos}</Text> a <Text style={styles.contadorEvolucaoTextGrey}>|</Text>
                            <Text style={styles.contadorEvolucaoTextbold}> {timerData.meses}</Text> m <Text style={styles.contadorEvolucaoTextGrey}>|</Text>
                            <Text style={styles.contadorEvolucaoTextbold}> {timerData.dias}</Text> d <Text style={styles.contadorEvolucaoTextGrey}> -</Text>
                        </Text>
                        <Text style={styles.contadorEvolucaoText}>
                            <Text style={styles.contadorEvolucaoTextbold}>{timerData.horas}</Text> h <Text style={styles.contadorEvolucaoTextGrey}>:</Text>
                            <Text style={styles.contadorEvolucaoTextbold}> {timerData.minutos}</Text> m <Text style={styles.contadorEvolucaoTextGrey}>:</Text>
                            <Text style={styles.contadorEvolucaoTextbold}> {timerData.segundos}</Text> s <Text style={styles.contadorEvolucaoTextGrey}></Text>
                        </Text>
                    </View>
                </ViewShot>

                <ButtonMedium value='Reiniciar contador' onPress={() => setShowQuestionsModal(true)}>
                    <MaterialCommunityIcons name="calendar-refresh-outline" size={24} color="white" />
                </ButtonMedium>
            </View>

            <ModalDedication header='Dedicatória' modalVisible={showDedicationModal} handleModal={handleDedication}>
                <Text style={styles.textDedicatoria}>
                    Esse App é um presente de um fã que admira muito o seu trabalho.
                </Text>
            </ModalDedication>

            <ModalShort modalVisible={showQuestionsModal} handleModal={setShowQuestionsModal}>
                <Titulo title={'Reiniciar contador'} subtitle="Recaiu? Calma! Levanta a cabeça e vamos continuar na luta!" >
                    <MaterialCommunityIcons name="calendar-refresh-outline" size={24} color={THEME.COLORS.PRIMARY} />
                </Titulo>

                <View style={styles.modalRestartContainer}>
                    <FormStyled>
                        <Titulo title='Fomulário de ajuda' />
                        <FieldAreaStyled>
                            <LabelStyled>
                                O que te levou a recair?
                            </LabelStyled>
                            <InputStyled
                                onChangeText={setReiniciarMotivo}
                                value={reiniciarMotivo}
                                placeholder="Tédio, solidão, fotos antigas, sites..."
                                placeholderTextColor={THEME.COLORS.SEMANTIC_2}
                                maxLength={formRules.maxLengthInput}
                            />
                        </FieldAreaStyled>

                        <FieldAreaStyled>
                            <LabelStyled>
                                Quer deixar algum comentário?
                            </LabelStyled>
                            <TextAreaStyled
                                onChangeText={setReiniciarComentario}
                                value={reiniciarComentario}
                                multiline={true}
                                numberOfLines={6}
                                placeholder="Escreva um pouco como você se sente neste momento..."
                                placeholderTextColor={THEME.COLORS.SEMANTIC_2}
                                maxLength={formRules.maxLengthTextArea}
                                textAlignVertical='top'
                            />
                        </FieldAreaStyled>


                    </FormStyled>
                </View>

                <View style={styles.buttonArea}>
                    <ButtonMedium onPress={() => setShowQuestionsModal(false)} value='Reiniciar contador' />
                </View>
            </ModalShort>

            <ModalFull modalVisible={firstTimeInApp}>
                <Titulo title={'Primeira vez no App?'} subtitle="Vamos fazer algumas configurações inicais." >
                    <Ionicons name="flag-outline" size={24} color={THEME.COLORS.PRIMARY} />
                </Titulo>

                <View style={styles.modalRestartContainer}>
                    <FormStyled>
                        <FieldAreaStyled>
                            <LabelStyled>
                                Qual última vez que consumiu conteúdo explícito?
                            </LabelStyled>

                            <View style={styles.dateTimePickerArea}>
                                <DatePickerStyledContainer onPress={() => { setShowDatePicker(true) }}>
                                    <Ionicons name="calendar-outline" style={{ marginRight: 8 }} size={16} color={THEME.COLORS.PRIMARY} />
                                    <Text style={styles.text}>
                                        {moment(dateLastConsumption).format('DD/MM/YYYY')}
                                    </Text>
                                </DatePickerStyledContainer>

                                {showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateLastConsumption}
                                        mode={'date'}
                                        is24Hour={true}
                                        onChange={onChangeDate}
                                    />
                                )}

                                <DatePickerStyledContainer onPress={() => { setShowTimePicker(true) }}>
                                    <Ionicons name="time-outline" style={{ marginRight: 8 }} size={16} color={THEME.COLORS.PRIMARY} />
                                    <Text style={styles.text}>
                                        {moment(timeLastConsumption).format('HH:mm')}
                                    </Text>
                                </DatePickerStyledContainer>

                                {showTimePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={timeLastConsumption}
                                        mode={'time'}
                                        is24Hour={true}
                                        onChange={onChangeTime}
                                    />
                                )}
                            </View>

                        </FieldAreaStyled>

                    </FormStyled>
                </View>

                <View style={styles.buttonArea}>
                    <ButtonMedium onPress={() => handleSetUserExternalAndLocalData()} value='Continuar'>
                        {isLoading && <ActivityIndicator size={THEME.FONT_SIZE.SM} color={THEME.COLORS.TEXT} />}
                    </ButtonMedium>
                </View>
            </ModalFull>

        </ScrollView>
    );
}



