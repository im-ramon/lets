import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { Vibration } from 'react-native';
import { Alert } from 'react-native'
import { client, account, ID } from '../services/appWriteApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (info: SignInProps) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (info: SignUpProps) => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<{ id: string; name: string; token: string; }>>
    loadingAuth: boolean;
    createdUserId: string;
    isLocalAuthenticationLogged: boolean;
    loading: boolean;
    errorLogin: boolean;
    setErrorLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLocalAuthenticationLogged: React.Dispatch<React.SetStateAction<boolean>>;
    vibrate: (type: 'click' | 'success' | 'error') => void;
}

type UserProps = {
    id: string;
    name: string;
    token: string;
}

type SignInProps = {
    email: string;
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
    // const [loading, setLoading] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [errorLogin, setErrorLogin] = useState<boolean>(false)
    const [createdUserId, setCreatedUserId] = useState<string>('')
    const [isLocalAuthenticationLogged, setIsLocalAuthenticationLogged] = useState<boolean>(false)

    const isAuthenticated = !!user.name;

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true)
        await account.createEmailSession(email, password);
        setLoadingAuth(false)
    }

    async function signOut() {
        vibrate('click');
    }


    async function signUp({ name, password }: SignUpProps) {
        setLoadingAuth(true)

        await account.create(
            ID.unique(),
            `${uuid.v4()}@lets.com`,
            password,
            name
        )
            .then(console.log)
            .catch(console.log)

        setLoadingAuth(false)
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

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loadingAuth,
            loading,
            errorLogin,
            createdUserId,
            isLocalAuthenticationLogged,
            setUser,
            signIn,
            signOut,
            signUp,
            setErrorLogin,
            vibrate,
            setIsLocalAuthenticationLogged,
        }}>
            {children}
        </AuthContext.Provider>
    );
}