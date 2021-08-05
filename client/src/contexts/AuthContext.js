import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useLocalStorage } from 'use-hooks'

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

    const [isLogued, setIsLogued] = useLocalStorage("isLogued", "false");
    const [user, setUser] = useLocalStorage("user");

    useEffect(() => {
        !isLogued && setIsLogued(false)
    }, [isLogued])

    return (
        <AuthContext.Provider value={{ isLogued, setIsLogued, user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}