import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Form as FormAnt, Input, Button, Checkbox } from 'antd';
import * as Yup from 'yup';
import AuthService from '../services/authService';
import { AuthContext } from '../contexts/AuthContext';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const Login = () => {
    const [isLogin, setIsLogin] = useState(false)
    console.log("🚀 ~ file: Login.jsx ~ line 8 ~ Login ~ isLogin", isLogin)
    const authService = new AuthService();
    const { isLogued, setIsLogued, user, setUser } = useContext(AuthContext);

    const history = useHistory();


    const signupSchema = !isLogin ? (
        Yup.object().shape({
            fullName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string()
                .equals([Yup.ref('confirmPassword'), null], '*Ambas contraseñas deben coincidir')
                .required('Campo requerido'),
            confirmPassword: Yup.string()
                .equals([Yup.ref('password'), null], '*Ambas contraseñas deben coincidir')
        })
    ) : (
        Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string()
                .required('Campo requerido'),
        })
    )

    const loginUser = async (values) => {
        const loguedUser = await !isLogin ? authService.registerUser(values) :
        await authService.loginUser({ email: values.email, password: values.password })
        if (loguedUser) {
            console.log("🚀 ~ file: Login.jsx ~ line 42 ~ loginUser ~ loguedUser", loguedUser)
            setIsLogued(true)
            setUser(loguedUser.user);

            history.push('/home');
        }
    }

    return (
        <div className='card'>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={signupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                    loginUser(values);
                }}
            >
                {({ errors, touched, values, getFieldProps }) => (
                    <Form>
                        {!isLogin && (
                            <>
                                <label htmlFor="fullName">Nombre completo</label>
                                <Input name="fullName" value={values.fullName} {...getFieldProps('fullName')} />
                                {errors.fullName && touched.fullName ? (
                                    <div>{errors.fullName}</div>
                                ) : null}
                            </>

                        )}
                        <label htmlFor="email">Email</label>
                        <Input name="email" value={values.email} {...getFieldProps('email')} />
                        {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                        ) : null}
                        <label htmlFor="password">Contraseña</label>
                        <Input.Password
                            name="password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={values.password}
                            {...getFieldProps('password')} />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                        {!isLogin && (
                            <>
                                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                                <Input.Password
                                    name="confirmPassword"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    value={values.confirmPassword}
                                    {...getFieldProps('confirmPassword')} />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <div>{errors.confirmPassword}</div>
                                ) : null}
                            </>
                        )}
                        <Button type="primary" htmlType="submit" className="submit-btn">{!isLogin ? 'Registrar' : 'Login'}</Button>

                    </Form>

                )}

            </Formik>
            {isLogin ? (
                <p>
                    ¿Aún no tienes una cuenta?
                    <Button type="link" onClick={() => setIsLogin(false)}>Regístrate</Button>
                </p>
            ) : (
                <p>
                    ¿Ya tienes una cuenta?
                    <Button type="link" onClick={() => setIsLogin(true)}>Ir al Login</Button>
                </p>
            )}
        </div>
    )
}

export default Login;