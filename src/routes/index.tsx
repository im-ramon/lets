import React, { useContext } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import 'react-native-gesture-handler';

import AuthRoutes from '../../src/routes/AuthRoutes'
import AppRoutes from '../../src/routes/AppRoutes'

import { AuthContext } from '../contexts/auth';

export default function Routes() {

    const { logged }: any = useContext(AuthContext)

    return (logged ? <AuthRoutes /> : <AppRoutes />);
}