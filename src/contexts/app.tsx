import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import moment from 'moment';
import consoleFeedback from '../utils/consoleConfig';

type AppContextData = {
    lastConsumption: string;
    recordNoConsumption: number;
    recordNoConsumptionformated: string,
    totalRelapse: number;
    score: number;
    relapseReasons: string;
    relapseDates: string;
    userRelapseReasons: string;
    firstTimeInApp: boolean;
    isLoading: boolean;
    isLoadingData: boolean;
    lastScoreUpdate: string;
    setLastConsumption: React.Dispatch<React.SetStateAction<string>>;
    setRecordNoConsumption: React.Dispatch<React.SetStateAction<number>>;
    setTotalRelapse: React.Dispatch<React.SetStateAction<number>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setRelapseReasons: React.Dispatch<React.SetStateAction<string>>;
    setRelapseDates: React.Dispatch<React.SetStateAction<string>>;
    setFirstTimeInApp: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    handleAlterScore: (handleType: 'add' | 'sub') => Promise<void>;
    updateLocalDataAndStates: (objData: object) => Promise<void>;
    fetchUserRelapseReasons: () => Promise<void>;
    restartStopwatch: (last_consumption: string, relapse_reasons: string | null, record_no_consumption_formated: string) => Promise<void>;
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext({} as AppContextData)

export function AppProvider({ children }: AppProviderProps) {

    const [lastConsumption, setLastConsumption] = useState<string>(moment().format())
    const [recordNoConsumption, setRecordNoConsumption] = useState<number>(0)
    const [recordNoConsumptionformated, setRecordNoConsumptionformated] = useState<string>('{ anos: 0, meses: 0, dias: 0, horas: 0, minutos: 0, segundos: 0 }')
    const [totalRelapse, setTotalRelapse] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [lastScoreUpdate, setLastScoreUpdate] = useState<string>(moment().format())
    const [relapseReasons, setRelapseReasons] = useState<string>('{}')
    const [relapseDates, setRelapseDates] = useState<string>('[]')
    const [userRelapseReasons, setUserRelapseReasons] = useState<string>('[]')
    const [firstTimeInApp, setFirstTimeInApp] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
    // Criar um estado de loading no start

    async function getLocalData() {
        const data = await AsyncStorage.getItem('@lets:user_data')

        if (data) {
            return JSON.parse(data)
        }
    }

    async function setLocalData(objData: any /* Corrigir depois a tipagem do parâmetro */) {
        await AsyncStorage.mergeItem('@lets:user_data', JSON.stringify(objData))
    }

    function refreshStates(data: any /* Corrigir depois a tipagem do parâmetro */) {
        try {
            data.last_consumption && setLastConsumption(data.last_consumption);
            data.last_score_update && setLastScoreUpdate(data.last_score_update);
            data.record_no_consumption_formated && setRecordNoConsumptionformated(data.record_no_consumption_formated);
            data.relapse_dates && setRelapseDates(data.relapse_dates);
            (data.record_no_consumption || data.record_no_consumption === 0) && setRecordNoConsumption(data.record_no_consumption);
            (data.score || data.score === 0) && setScore(data.score);
            (data.total_relapse || data.score === 0) && setTotalRelapse(data.total_relapse);
        } catch (error) {
            consoleFeedback('error', 'refreshStatesWithLocalData', error)
        }
    }

    async function updateLocalDataAndStates(objData: object) {
        await setLocalData(objData)
        refreshStates(objData)
    }

    async function startAppData() {
        setIsLoadingData(true)
        const localData = await getLocalData();

        if (localData) {
            refreshStates(localData)
            consoleFeedback('info', 'startAppData', 'Dados do LocalStorage carregadas!')
        } else {
            try {
                const externalData = await api.get('/user_data')

                if (externalData.data) {
                    setFirstTimeInApp(false)
                    updateLocalDataAndStates(externalData.data)
                    consoleFeedback('info', 'startAppData', 'Dados da API carregados!')
                } else {
                    setFirstTimeInApp(true)
                }

            } catch (error) {
                consoleFeedback('error', 'startAppData', error)
                return
            }
        }
        await fetchUserRelapseReasons()
        setIsLoadingData(false)
    }

    async function handleAlterScore(handleType: 'add' | 'sub') {
        setIsLoading(true)
        const showToastError = () => {
            Toast.show({
                type: 'error',
                text1: 'Você já resgatou seus pontos hoje!',
                text2: 'Você só pode resgatar seus pontos uma vez ao dia.'
            });
        }

        const showToastSuccess = () => {
            Toast.show({
                type: 'success',
                text1: '+5 pontos! Continue assim!',
                text2: 'Volte amanhã para conseguir mais.'
            });
        }

        if (handleType === 'add') {
            const wasThisRequestOneDayAfterTheLastRequest = moment().isAfter(lastScoreUpdate, 'day');

            if (wasThisRequestOneDayAfterTheLastRequest) {
                await api.patch('/alter_score', { handleType })
                    .then(async response => {
                        const localData = await getLocalData();
                        localData.score = response.data.score;
                        localData.last_score_update = response.data.last_score_update;

                        await updateLocalDataAndStates(localData)
                        showToastSuccess()
                    })
                    .catch((error) => {
                        consoleFeedback('error', 'handleAlterScore', error)
                        showToastError()
                    })
            } else {
                consoleFeedback('info', 'handleAlterScore', 'Não passou pela validação local, que verifica se o último resgate de pontos foi feito, pelo menos, no dia anterior.')
                showToastError()
            }
        }

        if (handleType === 'sub') {
            // await api.patch('/alter_score', { handleType })
            //     .then(async response => {
            //         const localData = await getLocalData();
            //         localData.score = response.data.newScore.score;

            //         await updateLocalDataAndStates(localData)
            //     })
            //     .catch((e) => {
            //         showToastError()
            //     })
        }

        setIsLoading(false)
    }

    async function restartStopwatch(last_consumption: string, relapse_reasons: string | null, record_no_consumption_formated: string) {
        await api.post('/restart_stopwatch', { last_consumption, relapse_reasons, record_no_consumption_formated })
            .then(async response => {
                await updateLocalDataAndStates(response.data);
                if (relapse_reasons) {
                    await fetchUserRelapseReasons(true);
                }
            })
            .then(() => {
                Toast.show({
                    type: 'info',
                    text1: 'Contador reiniciado!',
                })
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: 'Ops!',
                    text2: 'Não foi possível reiniciar o contador.',
                })
                consoleFeedback('error', 'restartStopwatch', err)
            })
    }

    async function fetchUserRelapseReasons(restart?: boolean) {
        if (restart) {
            await AsyncStorage.removeItem('@lets:relapse_reasons')
        }
        const localData = await AsyncStorage.getItem('@lets:relapse_reasons')

        if (localData) {
            setUserRelapseReasons(localData)
            consoleFeedback('info', 'fetchUserRelapseReasons', 'Dados do LocalStorage do UserRelapseReasons carregados.')
        } else {
            await api.get('/relapse_reasons').then(
                async response => {
                    await AsyncStorage.setItem('@lets:relapse_reasons', JSON.stringify(response.data))
                    setUserRelapseReasons(JSON.stringify(response.data))
                    consoleFeedback('info', 'fetchUserRelapseReasons', 'Dados externos do UserRelapseReasons carregados.')
                }
            ).catch(error => consoleFeedback('error', 'fetchUserRelapseReasons', error))

        }
    }

    useEffect(() => {
        startAppData()
    }, [])

    return (
        <AppContext.Provider value={{
            lastConsumption,
            recordNoConsumption,
            recordNoConsumptionformated,
            totalRelapse,
            score,
            relapseReasons,
            userRelapseReasons,
            relapseDates,
            firstTimeInApp,
            isLoading,
            isLoadingData,
            lastScoreUpdate,
            updateLocalDataAndStates,
            handleAlterScore,
            setLastConsumption,
            setRecordNoConsumption,
            setTotalRelapse,
            setScore,
            setRelapseReasons,
            setRelapseDates,
            setFirstTimeInApp,
            setIsLoading,
            restartStopwatch,
            fetchUserRelapseReasons,
        }}>
            {children}
        </AppContext.Provider>
    );
}