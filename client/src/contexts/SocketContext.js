import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSockets'
import { useLocalStorage } from 'use-hooks'
import { ChatContext } from './ChatContext';
import { AuthContext } from './AuthContext';
import { types } from '../types/types';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, connectedSocket, disconnectedSocket } = useSocket('http://localhost:8000');
    const {dispatch} = useContext(ChatContext);
    const {isLogued, user} = useContext(AuthContext);

    useEffect(() => {
        if(isLogued) connectedSocket()
        console.log("🚀 ~ file: SocketContext.js ~ line 16 ~ useEffect ~ isLogued", isLogued)
    }, [isLogued, connectedSocket]) 

    useEffect(() => {
        if(!isLogued) disconnectedSocket()
        console.log("🚀 ~ file: SocketContext.js ~ line 16 ~ useEffect ~ isLogued", isLogued)
    }, [isLogued, disconnectedSocket])
    
    useEffect(() => {
        socket?.on('users-list', (users) => {
            console.log("🚀 ~ file: SocketContext.js ~ line 34 ~ socket?.on ~ usuarios", users)
            dispatch({
                type: types.usuariosCargados,
                payload: users
            })
        })
    }, [socket, dispatch, isLogued, user])

    useEffect(() => {
        socket?.on('sendMsg', (messages) => {
            console.log('mensajes', messages)
        })
    }, [socket])

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}