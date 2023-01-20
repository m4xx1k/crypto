import React, {useState} from 'react';
import {Button, Stack, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {addNewCoin} from "../redux/table/tableSlice";
import {useSaveCoinMutation} from "../redux/table/tableApiSlice";

const initialCoinData = {
    name: '',
    img: '0',
    price: '0',
    ath_price: '0',
    ath_time: '0',
    atl_price: '0',
    atl_time: '0',
    market_cap: '0',
    total_supply: '0',
    full_name:"-",
    c1:'1',
    c2:'1',
    c3:'1',
    c4:'1',
    c5:'1',
    c6:'1',
    c7:'1',
    c8:'1',
    c9:'1',
    c10:'1'
}
const NewCoin = ({handleCloseDialog}) => {
    const [newCoinData, setNewCoinData] = useState(initialCoinData)
    const dispatch = useDispatch()
    const [saveCoin] = useSaveCoinMutation()
    const handleChange = (key,value)=>{
        setNewCoinData(prev => {
            const coin = {...prev}
            coin[key] = value
            return coin
        })
    }
    const handleAdd = async ()=>{
         if(!!newCoinData.name.length){
             dispatch(addNewCoin(newCoinData))
             await saveCoin(newCoinData)
             handleCloseDialog()
             alert(`Добавлено ${newCoinData.name}`)
             setNewCoinData(initialCoinData)
         }
     }
    return (
        <Stack padding={2} bgcolor='#fff' borderRadius={2} alignItems={'center'}>
            <Typography fontSize={22}>Добавлення нового рядка</Typography>
            <Typography fontSize={14} color={'grey'} marginBottom={1}>*поле name обовязкове</Typography>
            <Stack display='flex' flexDirection='row' gap={1} overflow={'scroll'} maxWidth={'85vw'} height='100px' alignItems={'center'}>
                {
                    Object.keys(newCoinData).map(key => (
                        <TextField sx={{minWidth:'150px'}} label={key} key={key} value={newCoinData[key]} onChange={(e) => handleChange(key,e.target.value)}/>
                    ))
                }
            </Stack>
            <Button sx={{width:'30%', marginTop:1}} variant={'contained'} onClick={handleAdd}>Додати</Button>

        </Stack>
    )
}

export default NewCoin;














// const NewCoin = () => {
//     const [name, setName] = useState('')
//     const dispatch = useDispatch()
//
//     return (
//         <Stack  display='flex' flexDirection='row' gap={1} padding={2} bgcolor='#fff' borderRadius={2}>
//             <TextField value={name} onChange={(e)=>setName(e.target.value)} label='Назва' error={!name.length}/>
//             <Button onClick={handleAdd}>Додати</Button>
//         </Stack>
//     );
// };