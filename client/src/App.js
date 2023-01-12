/* eslint-disable */
/*

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
*/

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Button, Stack, Typography} from "@mui/material";
import Filter from "./components/Filter";
import TableComponent from "./components/TableComponent";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentCoins, selectCurrentData, setData} from "./redux/table/tableSlice";
import {selectCurrentGroup, setGroups} from "./redux/groups/groupsSlice";
import Login from "./components/Login";
import {logoutUser, selectCurrentToken, setCredentials} from "./redux/user/userSlice";
import {useLogoutMutation} from "./redux/user/userApiSlice";
import jwt_decode from "jwt-decode";
import {useEffect} from "react";
import {useLazyFetchAllCoinsQuery, useSaveCoinMutation} from "./redux/table/tableApiSlice";
import {useLazyFetchAllGroupsQuery} from "./redux/groups/groupApiSlice";
import NewCoin from "./components/NewCoin";


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

function App() {
    const currentData = useSelector(selectCurrentData)
    const currentGroup = useSelector(selectCurrentGroup)
    const currentCoins = useSelector(selectCurrentCoins)
    const isLogined = useSelector(selectCurrentToken)
    const dispatch = useDispatch()
    const [saveCoin] = useSaveCoinMutation()
    const [logout] = useLogoutMutation()
    const [triggerCoins, resultCoins] = useLazyFetchAllCoinsQuery()
    const [triggerGroups, resultGroups] = useLazyFetchAllGroupsQuery()
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
            console.log(deleteProperties(resultCoins.data), 'coins')
        }
    }, [resultCoins])

    useEffect(() => {
        if (resultGroups.isSuccess) {

            dispatch(setGroups(deleteProperties(resultGroups.data)))
        }
    }, [resultGroups])

    const handleSaveTable = async () => {
        try{
            for (let elem in currentData) {
                await saveCoin(currentData[elem]).unwrap()
            }
            alert("Таблицю успішно збережено")
        }catch(e){
            alert("Сталась помилка( деталі у консолі")
            console.log(e)
        }
        

    }


    if (!isLogined) return <Login handleRefreshPage={refreshPage}/>
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
            <Stack width="100%" height="100%" display="flex" alignItems="center" flexDirection="column" gap={2}
                   paddingTop={2}>
                <Stack display='flex' flexDirection={'row'} gap={1}>
                    <Button variant='contained' onClick={handleLogOut} size='small'>Вийти</Button>
                    <Login handleRefreshPage={refreshPage} type="registration"/>
                </Stack>


                <Typography variant="h4" color="#56585a" fontWeight={700} textAlign="center">
                    РЕДАГУВАННЯ ТАБЛИЦІ
                </Typography>
                <Filter handleSaveCoins={handleSaveTable}/>
                <NewCoin/>
                {
                    Object.keys(currentGroup).length && currentCoins.length
                        ?
                        <TableComponent/>
                        :
                        null
                }

            </Stack>

        </div>
    );
}

export default App;
