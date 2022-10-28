import React, { useContext, useEffect, useState } from 'react'
import * as LocalAuthentication from 'expo-local-authentication';
import 'react-native-gesture-handler';
import { Loading } from '../components/Views/Loading';
import AuthRoutes from '../../src/routes/AuthRoutes'
import AppRoutes from '../../src/routes/AppRoutes'

import { AuthContext } from '../contexts/auth';
import { AppProvider } from '../contexts/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Routes() {

    const { isAuthenticated, loading, isLocalAuthenticationRequired, setIsLocalAuthenticationRequired, setLoading } = useContext(AuthContext)

    const [isLocallyAuthenticated, setIsLocallyAuthenticated] = useState<boolean>(false)

    async function checkIfIsLocalAuthenticationRequired() {
        const authRequired = await AsyncStorage.getItem('@lets:is_local_authentication_required')
        if (authRequired && authRequired === 'true') {
            setIsLocalAuthenticationRequired(JSON.parse(authRequired))
        } else {
            setIsLocalAuthenticationRequired(false)
            setIsLocallyAuthenticated(true)
        }
    }

    async function checkLocalAuthentication() {
        const response = await LocalAuthentication.authenticateAsync({
            cancelLabel: 'Cancelar',
            promptMessage: "Autorizar acesso ao App Let's!"
        })

        response.success ? setIsLocallyAuthenticated(true) : setIsLocallyAuthenticated(false)
    }

    async function startLocalAuthentication() {
        setLoading(true)
        await checkIfIsLocalAuthenticationRequired()

        if (isLocalAuthenticationRequired) {
            await checkLocalAuthentication()
        }
        setLoading(false)
    }

    useEffect(() => {
        startLocalAuthentication()
    }, [isLocalAuthenticationRequired])

    if (loading) {
        return <Loading />
    }

    return ((isAuthenticated && isLocallyAuthenticated) ? <AppProvider><AuthRoutes /></AppProvider> : <AppRoutes />);
}