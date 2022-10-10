import React, { useContext } from 'react'

import 'react-native-gesture-handler';
import { Loading } from '../components/Views/Loading';
import AuthRoutes from '../../src/routes/AuthRoutes'
import AppRoutes from '../../src/routes/AppRoutes'

import { AuthContext } from '../contexts/auth';
import { AppProvider } from '../contexts/app';

export default function Routes() {

    const { isAuthenticated, loading } = useContext(AuthContext)

    if (loading) {
        return <Loading />
    }

    return (isAuthenticated ? <AppProvider><AuthRoutes /></AppProvider> : <AppRoutes />);
}