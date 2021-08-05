import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { useLocalStorage } from 'use-hooks';
import AuthService from '../services/authService';
import { useHistory } from "react-router-dom";

const Logout = ({ user }) => {
    const authService = new AuthService();
    const { isLogued, setIsLogued } = useContext(AuthContext);
    const [, setUser] = useLocalStorage("user")
    const history = useHistory();

    const logoutInService = async () => {
        try {
            await authService.logoutUser(user.email);
            await setIsLogued(false);
            await setUser({});
            history.push('/login');


        } catch (err) {
            return err;
        }
    };
    return (
        <Button variant="primary" onClick={logoutInService}>Logout</Button>
    )
}

export default Logout;