import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../contexts/AuthContext';


export const useSocket = ( serverPath ) => {
    
    const [socket, setSocket] = useState(null)
    const [ online, setOnline ] = useState(false);
    const { user } = useContext(AuthContext);
    console.log("🚀 ~ file: useSockets.js ~ line 11 ~ useSocket ~ user", user)

    const disconnectedSocket = useCallback(() => {

        socket?.disconnect()
    },[socket]
    );

    const connectedSocket = useCallback(
        () => {
            const socketTemp = io.connect( serverPath, {
                transports: ['websocket'],
                autoConnect: true,
                forceNew: true,
                query: {
                    'x-token': user?.token,
                    'name': user?.name,
                    'id': user?.id
                }
            } );
            setSocket(socketTemp)
        },
        [serverPath, user],
    );

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])


    return {
        socket,
        online,
        connectedSocket,
        disconnectedSocket
    }
}; 