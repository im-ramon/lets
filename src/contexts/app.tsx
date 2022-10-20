import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [relapseReasons, setRelapseReasons] = useState<string>('reasonRelapse')
    const [relapseDates, setRelapseDates] = useState<string>('reasonDates')
    const [firstTimeInApp, setFirstTimeInApp] = useState<boolean>(false)
    // Criar um estado de loading no start

    async function startLocalUserData() {
        const localData = await AsyncStorage.getItem('@lets:user_data')

        if (localData) {
            const localDataJson = JSON.parse(localData)

            setLastConsumption(localDataJson.last_consumption)
            setRecordNoConsumption(localDataJson.record_no_consumption)
            setTotalRelapse(localDataJson.total_relapse)
            setScore(localDataJson.score)
            setRelapseReasons(localDataJson.reason_relapse)
            setRelapseDates(localDataJson.reason_dates)

            console.log('Local data encontrado!')
            return
        }

        try {
            const externalData = await api.get('/user_data')

            if (externalData.data) {
                setFirstTimeInApp(false)
                await AsyncStorage.setItem('@lets:user_data', JSON.stringify(externalData.data))

                setLastConsumption(externalData.data.last_consumption)
                setRecordNoConsumption(externalData.data.record_no_consumption)
                setTotalRelapse(externalData.data.total_relapse)
                setScore(externalData.data.score)
                setRelapseReasons(externalData.data.reason_relapse)
                setRelapseDates(externalData.data.reason_dates)

                console.log('External data encontrado!')
            } else {
                setFirstTimeInApp(true)
            }

        } catch (error) {
            console.log('startLocalUserData:', error)
            return
        }
    }

    useEffect(() => {
        startLocalUserData()
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