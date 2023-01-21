import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentGroup, setGroups} from "../redux/groups/groupsSlice";
import {selectCurrentCoins, setData} from "../redux/table/tableSlice";
import { selectCurrentToken, setCredentials} from "../redux/user/userSlice";
import {useLazyFetchAllCoinsQuery} from "../redux/table/tableApiSlice";
import {useLazyFetchAllGroupsQuery} from "../redux/groups/groupApiSlice";
import jwt_decode from "jwt-decode";
import { CircularProgress, Dialog, Stack, Typography} from "@mui/material";
import Login from "../components/Login";
import Filter from "../components/Filter";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewCoin from "../components/NewCoin";
import TableComponent from "../components/TableComponent";

function refreshPage() {
    window.location.reload(false);
}

function deleteProperties(list) {
    const copyList = JSON.parse(JSON.stringify(list))
    return copyList.map(elem => {
        let obj = elem
        delete obj._id
        delete obj.__v
        return obj
    })
}

function Projects() {
    const currentGroup = useSelector(selectCurrentGroup)
    const currentCoins = useSelector(selectCurrentCoins)
    const isLogined = useSelector(selectCurrentToken)
    const dispatch = useDispatch()
    const [triggerCoins, resultCoins] = useLazyFetchAllCoinsQuery()
    const [triggerGroups, resultGroups] = useLazyFetchAllGroupsQuery()

    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchData = async () => {
            await triggerCoins()
            await triggerGroups()
        }

        if (!!token) {
            const userData = jwt_decode(token)
            dispatch(setCredentials({user: userData.login, accessToken: token}))
            fetchData()

        }
    }, [])

    useEffect(() => {
        if (resultCoins.isSuccess) {
            dispatch(setData({data: deleteProperties(resultCoins.data)}))
        }
    }, [resultCoins])

    useEffect(() => {
        if (resultGroups.isSuccess) {

            dispatch(setGroups(deleteProperties(resultGroups.data)))
        }
    }, [resultGroups])


    if (isLogined && resultGroups.isLoading && resultCoins.isLoading)
        return(
            <Stack display={'flex'} width={'100vw'} height={'100vh'} alignItems={'center'} justifyContent={'center'}>
                <CircularProgress size={300}/>
            </Stack>
        )
    if (!isLogined) return <Login handleRefreshPage={refreshPage}/>



    return (
            <Stack width="100%" height="100%" display="flex" alignItems="center" flexDirection="column" gap={2}
                   paddingTop={2}>



                <Typography variant="h4" color="#56585a" fontWeight={700} textAlign="center">
                    РЕДАГУВАННЯ ТАБЛИЦІ
                </Typography>
                <Stack flexDirection={'row'} rowGap={2} alignItems={'center'} fontSize={60}>
                    <Filter/>
                    <AddBoxIcon fontSize={'inherit'} sx={{cursor:'pointer'}} color={'primary'} onClick={()=>setOpenDialog(true)}/>
                </Stack>
                <Dialog maxWidth={false} open={openDialog} onClose={()=>setOpenDialog(false)}>
                    <NewCoin handleCloseDialog={()=>setOpenDialog(false)}/>
                </Dialog>

                {
                    Object.keys(currentGroup).length && currentCoins.length
                        ?
                        <TableComponent/>
                        :
                        null
                }

            </Stack>

    );
}
export default Projects;