import React from 'react';
import {Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Outlet} from "react-router";

const Layout = () => {
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
                <Link to={'/parsing'}>
                    <Typography color={'primary'} fontSize={'20px'}>
                        Parsing
                    </Typography>
                </Link>
            </Stack>
            <Outlet/>
        </div>
    );
};

export default Layout;