import React, { useContext } from 'react';
import { types } from '../types/types';
import conectedImg from '../assets/rec.png'
import disconnectedImg from '../assets/dot.png'
import { MyContext } from '../contexts/MyContext'
const UsersList = (props) => {

    const { users, dispatch } = props;
    const { msg } = useContext(MyContext);

    const openChat = (id) => {
        dispatch({
            type: types.activarChat,
            payload: id
        })
    }

    return (
        <div>
            <h1>{msg}</h1>
            {users?.length > 0 && users?.map(user => (
                <div className="container-users-list" key={user._id} onClick={() => openChat(user._id)}>
                    <h3>{user.fullName}</h3>
                    {user.online ? <img className="connectionIcon" src={conectedImg} alt="" /> :
                        <img className="connectionIcon" src={disconnectedImg} alt="" />}
                    {/* <h3>{user.online ? 'conectado' : 'desconectado'}</h3> */}
                </div>
            ))}
        </div>

    )
}

export default UsersList;


