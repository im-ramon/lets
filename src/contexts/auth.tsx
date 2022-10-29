import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { Vibration } from 'react-native';
import { Alert } from 'react-native'
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import consoleFeedback from '../utils/consoleConfig';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    loadingAuth: boolean;
    createdUserId: string;
    isLocalAuthenticationRequired: boolean;
    loading: boolean;
    errorLogin: boolean;
    userIdOnClipboard: string;
    themeMode: 'DARK' | 'LIGHT',
    setThemeMode: React.Dispatch<React.SetStateAction<"DARK" | "LIGHT">>,
    setUserIdOnClipboard: React.Dispatch<React.SetStateAction<string>>;
    signIn: (info: SignInProps) => Promise<void>;
    signOut: () => Promise<void>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    signUp: (info: SignUpProps) => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<{ id: string; name: string; token: string; }>>
    setErrorLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLocalAuthenticationRequired: React.Dispatch<React.SetStateAction<boolean>>;
    vibrate: (type: 'click' | 'success' | 'error') => void;
}

type UserProps = {
    id: string;
    name: string;
    token: string;
}

type SignInProps = {
    id: string;
    password: string;
}

type SignUpProps = {
    name: string;
    password: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState({
        id: '',
        name: '',
        token: '',
    })

    const [loadingAuth, setLoadingAuth] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [userIdOnClipboard, setUserIdOnClipboard] = useState<string>('')
    const [errorLogin, setErrorLogin] = useState<boolean>(false)
    const [createdUserId, setCreatedUserId] = useState<string>('')
    const [isLocalAuthenticationRequired, setIsLocalAuthenticationRequired] = useState<boolean>(false)
    const [themeMode, setThemeMode] = useState<'DARK' | 'LIGHT'>('DARK')

    const isAuthenticated = !!user.name;

    async function getUser() {
        const userInfo = await AsyncStorage.getItem('@lets:user_logged')
        let hasUser: UserProps = JSON.parse(userInfo || '{}')

        if (Object.keys(hasUser).length > 0) {
            setTokenToAxios(hasUser.token)

            setUser({
                id: hasUser.id,
                name: hasUser.name,
                token: hasUser.token
            })
        }
        setLoading(false)
    }

    async function signIn({ id, password }: SignInProps) {
        setLoadingAuth(true)

        await removeLocalData();

        try {
            const response = await api.post('/auth_user', {
                id, password
            })

            await AsyncStorage.setItem('@lets:user_logged', JSON.stringify(response.data))

            setTokenToAxios(response.data.token)

            setUser({
                id: response.data.id,
                name: response.data.name,
                token: response.data.token
            })

            vibrate('success');
            setLoadingAuth(false)


        } catch (error) {
            consoleFeedback('error', 'signIn', error)
            vibrate('error');
            // Refatorar isso posteriormente - Tirar da camada de context e colocar no component SignIn
            Alert.alert('Falha ao fazer login',
                'Usuário e/ou senha incorreto(s)!', [
                {
                    text: 'Tentar novamente', style: 'cancel',
                    onPress: () => { setErrorLogin(false) }
                }
            ]);
            setErrorLogin(true)
            setLoadingAuth(false)
        }
    }

    async function signOut() {
        await removeLocalData();
        vibrate('click');
    }

    async function signUp({ name, password }: SignUpProps) {
        setLoadingAuth(true)

        try {
            const response = await api.post('/create_user', { name, password })
            setCreatedUserId(response.data.id)
        } catch (error) {
            vibrate('error');
            consoleFeedback('error', 'signUp', error)
            Alert.alert('Falha ao cadastrar usuário',
                'Tente novamente mais tarde', [
                {
                    text: 'Entendi', style: 'cancel',
                    onPress: () => { setErrorLogin(false) }
                }
            ]);
        }

        setLoadingAuth(false)
    }

    async function removeLocalData() {
        await AsyncStorage.removeItem('@lets:user_logged')
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    token: '',
                })
            })

        await AsyncStorage.removeItem('@lets:user_data')
        await AsyncStorage.removeItem('@lets:relapse_reasons')
        await AsyncStorage.removeItem('@lets:is_local_authentication_required')
    }

    async function loadThemeMode() {
        const theme = await AsyncStorage.getItem('@lets:theme_mode')
        if (theme == 'DARK' || theme == 'LIGHT') {
            setThemeMode(theme)
        } else {
            setThemeMode('DARK')
        }
    }

    function setTokenToAxios(token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    function vibrate(type: 'click' | 'success' | 'error') {
        switch (type) {
            case 'click':
                Vibration.vibrate(125)
                break;

            case 'success':
                Vibration.vibrate(250)
                break;

            case 'error':
                Vibration.vibrate([0, 150, 50, 150])
                break;

            default:
                break;
        }



    }

    useEffect(() => {
        loadThemeMode()
        getUser()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loadingAuth,
            loading,
            errorLogin,
            createdUserId,
            isLocalAuthenticationRequired,
            userIdOnClipboard,
            themeMode,
            setThemeMode,
            setUserIdOnClipboard,
            setLoading,
            setUser,
            signIn,
            signOut,
            signUp,
            setErrorLogin,
            vibrate,
            setIsLocalAuthenticationRequired,
        }}>
            {children}
        </AuthContext.Provider>
    );
}