import React, {useState} from 'react';
import {Button, Stack, TextField, Typography} from "@mui/material";
import {authApiSlice, useRegistrationMutation} from "../redux/user/userApiSlice";
import {useDispatch} from "react-redux";
import {setCredentials} from "../redux/user/userSlice";

const Login = ({handleRefreshPage, type="login"}) => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [registration] = useRegistrationMutation()
    const [handleLogin] = authApiSlice.useLoginMutation()
    const handleSubmit = async () => {
        if(login.length && pass.length) {
            try {
                if (type === 'login') {
                    const data = await handleLogin({login, password: pass}).unwrap()
                    dispatch(setCredentials(data))
                } else if (type === 'registration') {
                    await registration({login,password:pass})
                    alert(`Добавленно нового адміна! Логін: ${login} Пароль: ${pass}`)
                }

                handleRefreshPage()
            } catch (e) {
                console.log(e)
                alert('Сталась помилка(')
            }
        }
    }
    return (
        <Stack padding={2} gap={1} display="flex" flexDirection='row' alignItems='center' bgcolor="#fff"
               borderRadius={2}>
            <Typography>{type==='login' ? 'Вхід' : "Добавлення адміна"}</Typography>
            <TextField size='small' value={login} label="Login" onChange={e => setLogin(e.target.value)}/>
            <TextField size='small' value={pass} label='Password' onChange={e => setPass(e.target.value)}/>
            <Button color='success' variant='contained' onClick={handleSubmit}>
                {type==='login' ? 'Вхід' : '+'}
            </Button>

        </Stack>
    );
};

export default Login;