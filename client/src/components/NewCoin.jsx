import React, {useState} from 'react';
import {Button, Stack, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {addNewCoin} from "../redux/table/tableSlice";
import {useSaveCoinMutation} from "../redux/table/tableApiSlice";

const initialCoinData = {
    name: '',
    c1: '0',
    c2: '0',
    c3: '0',
    c4: '0',
    c5: '0',
    c6: '0',
    c7: '0',
    c8: '0',
    c9: '0',
    c10: '0',
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
            <Stack display='flex' flexDirection='row' gap={1}>
                {
                    Object.keys(newCoinData).map(key => (
                        <TextField label={key} key={key} value={newCoinData[key]} onChange={(e) => handleChange(key,e.target.value)}/>
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