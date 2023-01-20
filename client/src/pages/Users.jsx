import React, {useEffect} from 'react';
import {useDeleteUserMutation, useGetAllUsersQuery} from "../redux/user/userApiSlice";
import {Card, Stack, Typography} from "@mui/material";
import Login from "../components/Login";
import DeleteIcon from '@mui/icons-material/Delete';

function refreshPage() {
    window.location.reload(false);
}
const Users = () => {
    const {data, isSuccess} = useGetAllUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const handleDeleteUser = async (login) => deleteUser(login)
    useEffect(()=>console.log(data),[data])
    if(!isSuccess) return <Typography>loading</Typography>
    return (
        <Stack display={'flex'} justifyContent={'center'} width={'100vw'} alignItems={'center'}>
            <Login handleRefreshPage={refreshPage} type="registration"/>
            <Typography  variant="h4" color="#56585a" fontWeight={700}>Користувачі</Typography>
            <Stack display={'flex'} width={'80vw'} gap={1} flexDirection={'row'}>
                {
                    data.map((user, index)=>(
                        <Card sx={{width:'fit-content', display:'flex', alignItems:'center', padding:1, gap:1}} key={user.login}>
                            <Typography fontSize={22}>{`${index+1}. ${user.login}`}</Typography>
                            <DeleteIcon sx={{cursor:'pointer'}} onClick={()=>handleDeleteUser(user.login)} color={'error'}/>
                        </Card>
                    ))
                }
            </Stack>
        </Stack>
    );
};

export default Users;