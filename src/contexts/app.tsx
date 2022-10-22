import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import moment from 'moment';

type AppContextData = {
    lastConsumption: string;
    recordNoConsumption: number;
    totalRelapse: number;
    score: number;
    relapseReasons: string;
    relapseDates: string;
    firstTimeInApp: boolean,
    setLastConsumption: React.Dispatch<React.SetStateAction<string>>;
    setRecordNoConsumption: React.Dispatch<React.SetStateAction<number>>;
    setTotalRelapse: React.Dispatch<React.SetStateAction<number>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setRelapseReasons: React.Dispatch<React.SetStateAction<string>>;
    setRelapseDates: React.Dispatch<React.SetStateAction<string>>;
    setFirstTimeInApp: React.Dispatch<React.SetStateAction<boolean>>;
    handleAlterScore: (handleType: 'add' | 'sub') => Promise<void>
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext({} as AppContextData)

export function AppProvider({ children }: AppProviderProps) {

    const [lastConsumption, setLastConsumption] = useState<string>('lastConsumption')
    const [recordNoConsumption, setRecordNoConsumption] = useState<number>(0)
    const [totalRelapse, setTotalRelapse] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [lastScoreUpdate, setLastScoreUpdate] = useState<string>('lastScoreUpdate')
    const [relapseReasons, setRelapseReasons] = useState<string>('reasonRelapse')
    const [relapseDates, setRelapseDates] = useState<string>('reasonDates')
    const [firstTimeInApp, setFirstTimeInApp] = useState<boolean>(false)
    // Criar um estado de loading no start

    async function getLocalData() {
        const data = await AsyncStorage.getItem('@lets:user_data')

        if (data) {
            return JSON.parse(data)
        }
    }

    async function setLocalData(objData: object) {
        await AsyncStorage.setItem('@lets:user_data', JSON.stringify(objData))
    }

    function refreshStates(data: any /* Corrigir depois a tipagem do parâmetro */) {
        try {
            setLastConsumption(data.last_consumption)
            setRecordNoConsumption(data.record_no_consumption)
            setTotalRelapse(data.total_relapse)
            setScore(data.score)
            setLastScoreUpdate(data.last_score_update)
            setRelapseReasons(data.relapse_reasons)
            setRelapseDates(data.relapse_dates)
        } catch (error) {
            console.log('refreshStatesWithLocalData: ', error)
        }
    }

    async function updateLocalDataAndStates(objData: object) {
        refreshStates(objData)
        await setLocalData(objData)
    }

    async function startAppData() {
        const localData = await getLocalData();

        if (localData) {
            refreshStates(localData)
            console.log('Local data encontrado!', new Date().getMilliseconds())
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
    }

    async function handleAlterScore(handleType: 'add' | 'sub') {
        const showToastError = () => {
            Toast.show({
                type: 'error',
                text1: 'Você já resgatou seus pontos hoje!',
                text2: 'Você só pode resgatar seus pontos uma vez ao dia.'
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
    }

    useEffect(() => {
        startAppData()
    }, [])

    return (
        <AppContext.Provider value={{
            lastConsumption,
            recordNoConsumption,
            totalRelapse,
            score,
            relapseReasons,
            relapseDates,
            firstTimeInApp,
            handleAlterScore,
            setLastConsumption,
            setRecordNoConsumption,
            setTotalRelapse,
            setScore,
            setRelapseReasons,
            setRelapseDates,
            setFirstTimeInApp,
        }}>
            {children}
        </AppContext.Provider>
    );
}