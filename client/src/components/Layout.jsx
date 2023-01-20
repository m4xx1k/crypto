import React from 'react';
import {Button, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Outlet} from "react-router";
import {logoutUser} from "../redux/user/userSlice";
import {useDispatch} from "react-redux";
import {useLogoutMutation} from "../redux/user/userApiSlice";
function refreshPage() {
    window.location.reload(false);
}
const Layout = () => {
    const dispatch = useDispatch()
    const [logout] = useLogoutMutation()

    const handleLogOut = async () => {
        try {
            const data = await logout().unwrap()
            dispatch(logoutUser())
            refreshPage()
            console.log(data, localStorage.getItem('token'))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="App">
            <Stack display={'inline-flex'} alignSelf={'center'} justifySelf={'center'} flexDirection={'row'} gap={6}
                   margin={1}>
                <Link to={'/'}>
                    <Typography color={'primary'} fontSize={'20px'}>
                        Projects
                    </Typography>
                </Link>
                <Link to={'/users'}>
                    <Typography color={'primary'} fontSize={'20px'}>
                        Users
                    </Typography>
                </Link>
                <Button variant='contained' onClick={handleLogOut} size='small'>Вийти</Button>
            </Stack>
            <Outlet/>
        </div>
    );
};

export default Layout;