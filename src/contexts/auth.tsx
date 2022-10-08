import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { Alert } from 'react-native'
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (info: SignInProps) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (info: SignUpProps) => Promise<void>;
    loadingAuth: boolean;
    createdUserId: string;
    loading: boolean;
    errorLogin: boolean;
    setErrorLogin: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [errorLogin, setErrorLogin] = useState<boolean>(false)
    const [createdUserId, setCreatedUserId] = useState<string>('')

    const isAuthenticated = !!user.name;

    useEffect(() => {
        async function getUser() {
            const userInfo = await AsyncStorage.getItem('@userLogged')
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

        getUser()
    }, [])

    async function signIn({ id, password }: SignInProps) {
        setLoadingAuth(true)

        try {
            const response = await api.post('/auth_user', {
                id, password
            })

            await AsyncStorage.setItem('@userLogged', JSON.stringify(response.data))

            setTokenToAxios(response.data.token)

            setUser({
                id: response.data.id,
                name: response.data.name,
                token: response.data.token
            })

            setLoadingAuth(false)


        } catch (error) {
            console.log('Informação do erro: ', error)
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
        await AsyncStorage.removeItem('@userLogged')
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    token: '',
                })
            })
    }

    async function signUp({ name, password }: SignUpProps) {
        setLoadingAuth(true)

        try {
            const response = await api.post('/create_user', { name, password })
            setCreatedUserId(response.data.id)
        } catch (error) {
            console.log('Informação do erro: ', error)
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

    function setTokenToAxios(token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loadingAuth,
            loading,
            errorLogin,
            createdUserId,
            signIn,
            signOut,
            signUp,
            setErrorLogin
        }}>
            {children}
        </AuthContext.Provider>
    );
}