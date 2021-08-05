import React, { useState, useContext, useEffect } from 'react';
import Logout from '../components/Logout';
import UsersList from '../components/UsersList';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import { SocketContext } from '../contexts/SocketContext';

const Home = () => {
    const [users, setUsers] = useState([])
    const { isLogued, user } = useContext(AuthContext);
    const { chatState, dispatch } = useContext(ChatContext);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        setUsers(chatState.users)
        console.log('soy el user', chatState)
    }, [chatState, isLogued, socket])

    return (
        <div className='chat-container'>
            <Logout user={user} />
            <UsersList users={users} dispatch={dispatch} />
            {/* <ChatMessages chatState={chatState} dispatch={dispatch} sendMessage={sendMessage} setMessage={setMessage} message={message} /> */}
        </div>
    )
}

export default Home;