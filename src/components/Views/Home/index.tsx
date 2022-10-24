import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Button } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useInterval } from 'usehooks-ts'

import { ContributionGraph } from "react-native-chart-kit";
import moment from 'moment';

import { AppContext } from '../../../contexts/app';
import { AuthContext } from '../../../contexts/auth';

import { api } from '../../../services/api';

import logo from '../../../assets/img/icon.png';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { FieldAreaStyled, FormStyled, InputStyled, LabelStyled, DatePickerStyledContainer } from '../../parts/_SytyledComponents'
import { Titulo } from '../../parts/Titulo';
import { ButtonMedium } from '../../parts/ButtonMedium';
import { ModalDedication } from '../../parts/ModalDedication';
import { ModalShort } from '../../parts/ModalShort';
import { ModalFull } from '../../parts/ModalFull';
import { styles } from './styles';

import { THEME } from '../../../theme';
import { formRules } from '../../../utils/formRules';
import { Loading } from '../Loading';


// Skiping no erro de tipagem no gráfico
const handleToolTip: any = {}

export function Home() {

    // Contexts
    const { user, vibrate } = useContext(AuthContext)
    const { lastConsumption, score, firstTimeInApp, relapseDates, isLoadingData, setFirstTimeInApp, updateLocalDataAndStates, restartStopwatch } = useContext(AppContext)
    // -------------------------------------------------------------- Fim -------------------------------------------------------------- //


    // Components states
    const [showQuestionsModal, setShowQuestionsModal] = useState<boolean>(false);
    const [isLoadingHome, setIsLoadingHome] = useState<boolean>(false)
    const [reiniciarMotivo, setReiniciarMotivo] = useState<string>('');
    // -------------------------------------------------------------- Fim -------------------------------------------------------------- //


    // Chart configurations
    const [showChartSubtitle, setShowChartSubtitle] = useState<boolean>(false);

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

    const commitsData = () => {
        const myarray: [] = JSON.parse(relapseDates)
        const filtredArray = myarray.map((item) => {
            return {
                date: item,
                count: 1
            }
        })
        return filtredArray
    }
    // -------------------------------------------------------------- Fim -------------------------------------------------------------- //


    // Chart screeshot configurations 
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
    // -------------------------------------------------------------- Fim -------------------------------------------------------------- //


    // Stopwatch configurations
    type timerDataProps = {
        anos: number | string;
        meses: number | string;
        dias: number | string;
        horas: number | string;
        minutos: number | string;
        segundos: number | string;
    }

    const [timerData, setTimerData] = useState<timerDataProps>({ anos: 0, meses: 0, dias: 0, horas: 0, minutos: 0, segundos: 0 })

    function performsStopwatchCalculations() {
        const anos = moment().diff(lastConsumption, 'years');
        const meses = moment().diff(moment(lastConsumption).add(anos, 'years'), 'months')
        const dias = moment().diff(moment(lastConsumption).add(anos, 'years').add(meses, 'months'), 'days')
        const horas = moment().diff(moment(lastConsumption).add(anos, 'years').add(meses, 'months').add(dias, 'days'), 'hours')
        const minutos = moment().diff(moment(lastConsumption).add(anos, 'years').add(meses, 'months').add(dias, 'days').add(horas, 'hours'), 'minutes')
        const segundos = moment().diff(moment(lastConsumption).add(anos, 'years').add(meses, 'months').add(dias, 'days').add(horas, 'hours').add(minutos, 'minutes'), 'seconds')

        setTimerData({ anos, meses, dias, horas, minutos, segundos })
    }

    useInterval(() => {
        performsStopwatchCalculations()
    }, 1000)

    async function handleRestartStopWatch(date: Date, reasons: string) {
        setIsLoadingHome(true)

        await restartStopwatch(formatDateBeforeSave(date, date), reasons, JSON.stringify(timerData))
        setShowQuestionsModal(false)

        setIsLoadingHome(false)
    }
    // -------------------------------------------------------------- Fim -------------------------------------------------------------- //


    // Calendar picker configurations
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

    // Relapse picker configurations
    const [dateRelapse, setDateRelapse] = useState(new Date());

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;

        if (moment(currentDate).isAfter(new Date())) {
            Alert.alert(
                'Escolha uma data válida.',
                `Não são permitidas datas no futuro. \nVocê selecionou a data: ${moment(currentDate).format('DD/MM/YYYY')}`,
                [{
                    text: 'Fechar', style: 'cancel',
                }]
            )
            setDateLastConsumption(new Date());
        } else {
            setDateRelapse(currentDate);
        }

    };

    const showMode = (currentMode: any) => {
        DateTimePickerAndroid.open({
            value: dateRelapse,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    // -------------------------------------------------------------- Fim -------------------------------------------------------------- //


    // Dedication modal configurations
    const [dedicationShortPress, setDedicationShortPress] = useState<number>(0);
    const [dedicationLongPress, setDedicationLongPress] = useState<number>(0);
    const [showDedicationModal, setShowDedicationModal] = useState<boolean>(false);

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
    // -------------------------------------------------------------- Fim -------------------------------------------------------------- //


    // Show alert to clink a chart date
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
    // -------------------------------------------------------------- Fim -------------------------------------------------------------- //


    // Datas formatations
    const userNameEdited = (userName: string) => {
        let name = userName.split(' ')
        return name[0]
    }

    function formatDateBeforeSave(date: Date, time: Date) {
        return moment(date).format('YYYY-MM-DD') + "T" + moment(time).format('HH:mm:ss') + "-03:00"
    }
    // -------------------------------------------------------------- Fim -------------------------------------------------------------- //


    // Start first user data
    async function handleStartFirstUserData() {
        setIsLoadingHome(true)
        const data = formatDateBeforeSave(dateRelapse, dateRelapse)
        try {
            await api.post('/user_data', {
                last_consumption: data,
                timerData
            })
                .then(response => updateLocalDataAndStates(response.data))
                .then(() => {
                    setDateLastConsumption(new Date());
                    setTimeLastConsumption(new Date())
                })

        } catch (e) {
            console.log('handleStartFirstUserData | Erro: ', e)
        }
        setIsLoadingHome(false)
    }

    function handleSetUserExternalAndLocalData() {
        handleStartFirstUserData()
        setFirstTimeInApp(false)
    }
    // -------------------------------------------------------------- Fim -------------------------------------------------------------- //

    return (
        isLoadingData ? <Loading /> :
            (<ScrollView showsVerticalScrollIndicator={false} >
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
                                values={commitsData()}
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

                    <ButtonMedium color={THEME.COLORS.PRIMARY} value='Reiniciar contador' onPress={() => setShowQuestionsModal(true)}>
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
                            <Titulo title='Formulário de ajuda' />
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

                            {/* <FieldAreaStyled>
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
                        </FieldAreaStyled> */}
                            <LabelStyled>
                                Quando aconteceu?
                            </LabelStyled>
                            <View style={styles.dateTimePickerArea}>
                                <DatePickerStyledContainer onPress={showDatepicker}>
                                    <Ionicons name="calendar-outline" style={{ marginRight: 8 }} size={16} color={THEME.COLORS.PRIMARY} />
                                    <Text style={styles.text}>
                                        {moment(dateRelapse).format('DD/MM/YYYY')}
                                    </Text>
                                </DatePickerStyledContainer>

                                <DatePickerStyledContainer onPress={showTimepicker}>
                                    <Ionicons name="time-outline" style={{ marginRight: 8 }} size={16} color={THEME.COLORS.PRIMARY} />
                                    <Text style={styles.text}>
                                        {moment(dateRelapse).format('HH:mm')}
                                    </Text>
                                </DatePickerStyledContainer>
                            </View>

                        </FormStyled>
                    </View>

                    <View style={styles.buttonArea}>
                        <ButtonMedium color={THEME.COLORS.PRIMARY} onPress={() => handleRestartStopWatch(dateRelapse, reiniciarMotivo)} value='Reiniciar contador'>
                            {isLoadingHome && <ActivityIndicator color={THEME.COLORS.TEXT} size={THEME.FONT_SIZE.SM} />}
                        </ButtonMedium>
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
                                    <DatePickerStyledContainer onPress={showDatepicker}>
                                        <Ionicons name="calendar-outline" style={{ marginRight: 8 }} size={16} color={THEME.COLORS.PRIMARY} />
                                        <Text style={styles.text}>
                                            {moment(dateRelapse).format('DD/MM/YYYY')}
                                        </Text>
                                    </DatePickerStyledContainer>

                                    <DatePickerStyledContainer onPress={showTimepicker}>
                                        <Ionicons name="time-outline" style={{ marginRight: 8 }} size={16} color={THEME.COLORS.PRIMARY} />
                                        <Text style={styles.text}>
                                            {moment(dateRelapse).format('HH:mm')}
                                        </Text>
                                    </DatePickerStyledContainer>
                                </View>

                            </FieldAreaStyled>

                        </FormStyled>
                    </View>

                    <View style={styles.buttonArea}>
                        <ButtonMedium color={THEME.COLORS.PRIMARY} onPress={() => handleSetUserExternalAndLocalData()} value='Continuar'>
                            {isLoadingHome && <ActivityIndicator size={THEME.FONT_SIZE.SM} color={THEME.COLORS.TEXT} />}
                        </ButtonMedium>
                    </View>
                </ModalFull>

            </ScrollView>)
    );
}