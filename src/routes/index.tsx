import React, { useContext, useEffect } from 'react'
import * as LocalAuthentication from 'expo-local-authentication';
import 'react-native-gesture-handler';
import { Loading } from '../components/Views/Loading';
import AuthRoutes from '../../src/routes/AuthRoutes'
import AppRoutes from '../../src/routes/AppRoutes'

import { AuthContext } from '../contexts/auth';
import { AppContext } from '../contexts/app';
import { AppProvider } from '../contexts/app';

export default function Routes() {

    const { isAuthenticated, loading, isLocalAuthenticationLogged, setIsLocalAuthenticationLogged } = useContext(AuthContext)
    const { firstTimeInApp } = useContext(AppContext)

    async function checkLocalAuthentication() {
        const response = await LocalAuthentication.authenticateAsync({
            cancelLabel: 'Cancelar',
            promptMessage: "Autorizar acesso ao App Let's!"
        })

        response.success ? setIsLocalAuthenticationLogged(true) : setIsLocalAuthenticationLogged(false)
    }

    useEffect(() => {
        !firstTimeInApp && checkLocalAuthentication()
    }, [])

    if (loading) {
        return <Loading />
    }

    return ((isAuthenticated && isLocalAuthenticationLogged) ? <AppProvider><AuthRoutes /></AppProvider> : <AppRoutes />);
}