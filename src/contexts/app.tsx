import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import moment from 'moment';

type AppContextData = {
    lastConsumption: string;
    recordNoConsumption: number;
    recordNoConsumptionformated: string,
    totalRelapse: number;
    score: number;
    relapseReasons: string;
    relapseDates: string;
    firstTimeInApp: boolean;
    isLoading: boolean;
    isLoadingData: boolean;
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
            data.last_consumption && setLastConsumption(data.last_consumption)
            data.last_score_update && setLastScoreUpdate(data.last_score_update)
            data.record_no_consumption && setRecordNoConsumption(data.record_no_consumption)
            data.record_no_consumption_formated && setRecordNoConsumptionformated(data.record_no_consumption_formated)
            data.relapse_dates && setRelapseDates(data.relapse_dates)
            data.score && setScore(data.score)
            data.total_relapse && setTotalRelapse(data.total_relapse)
        } catch (error) {
            console.log('refreshStatesWithLocalData: ', error)
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
            console.log('Localdata encontrado!', new Date().getMilliseconds())
        } else {
            try {
                const externalData = await api.get('/user_data')

                if (externalData.data) {
                    setFirstTimeInApp(false)
                    updateLocalDataAndStates(externalData.data)

                    console.log('External data encontrado!', new Date().getMilliseconds())
                } else {
                    setFirstTimeInApp(true)
                }

            } catch (error) {
                console.log('startAppData:', error)
                return
            }
        }
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
                        localData.score = response.data.newScore.score;
                        localData.last_score_update = response.data.newScore.last_score_update;

                        await updateLocalDataAndStates(localData)
                        showToastSuccess()
                    })
                    .catch((e) => {
                        console.log('handleAlterScore | add: ', e)
                        showToastError()
                    })
            } else {
                console.log('Erro: Validação local se o último resgate de pontos foi pelo menos no dia anterior.')
                showToastError()
            }
        }

        if (handleType === 'sub') {
            await api.patch('/alter_score', { handleType })
                .then(async response => {
                    const localData = await getLocalData();
                    localData.score = response.data.newScore.score;

                    await updateLocalDataAndStates(localData)
                })
                .catch((e) => {
                    console.log('handleAlterScore | sub: ', e)
                    showToastError()
                })
        }

        setIsLoading(false)
    }

    async function restartStopwatch(last_consumption: string, relapse_reasons: string | null, record_no_consumption_formated: string) {
        await api.post('/restart_stopwatch', { last_consumption, relapse_reasons, record_no_consumption_formated })
            .then(async response => await updateLocalDataAndStates(response.data))
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
                console.log('restartStopwatch:', err)
            })
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
            relapseDates,
            firstTimeInApp,
            isLoading,
            isLoadingData,
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
        }}>
            {children}
        </AppContext.Provider>
    );
}