import React, {useState} from 'react';
import {Button, Stack, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {addNewCoin} from "../redux/table/tableSlice";

const NewCoin = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const handleAdd = async ()=>{
        if(!!name.length){
            dispatch(addNewCoin(name))
        }
    }
    return (
        <Stack  display='flex' flexDirection='row' gap={1} padding={2} bgcolor='#fff' borderRadius={2}>
            <TextField value={name} onChange={(e)=>setName(e.target.value)} label='Назва' error={!name.length}/>
            <Button onClick={handleAdd}>Додати</Button>
        </Stack>
    );
};

export default NewCoin;