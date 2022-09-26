import React, { useState, createContext } from 'react';

export const AuthContext = createContext({})

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [logged, setLogged] = useState<boolean>(false)

    return (
        <AuthContext.Provider value={{ logged, setLogged }}>
            {children}
        </AuthContext.Provider>
    );
}