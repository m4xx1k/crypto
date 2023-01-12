import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, CircularProgress, Stack} from "@mui/material";
import { useSelector} from "react-redux";
import {
    selectCurrentData,
    selectCurrentCoins,
    selectChangedCoinsNames
} from "../redux/table/tableSlice";
import Row from "./Row";
import {selectCurrentGroup} from "../redux/groups/groupsSlice";
import {useSaveCoinMutation} from "../redux/table/tableApiSlice";


const TableComponent = () => {
    const data = useSelector(selectCurrentData)
    const group = useSelector(selectCurrentGroup)
    const selectedCoins = useSelector(selectCurrentCoins)
    const changedCoinsNames = useSelector(selectChangedCoinsNames)
    const [saveCoin] = useSaveCoinMutation()
    const [isSaving, setIsSaving] =useState(false)
    const handleSave = async ()=>{
        setIsSaving(true)
        try{
            changedCoinsNames.forEach( async (coinName)=>{
                const coin = data.find(elem=>elem.name===coinName)
                await saveCoin(coin).unwrap()
            })
            alert("Данні збережено успішно!")
        }catch (e) {
            alert('error, info in console')
            console.log(e)
        }finally {
            setIsSaving(false)
        }

    }
    if(isSaving) return (
        <Stack display={'flex'} width={'100vw'} height={'100vh'} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress size={300}/>
        </Stack>

    )
    return (
        <Box sx={{padding:2, maxWidth:"90vw"}} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Coin</TableCell>
                            {
                                Object.keys(group).map(elem=>{
                                    if(group[elem] && elem!=="name"){
                                        return (
                                            <TableCell key={elem} align="center">{elem}</TableCell>
                                        )
                                    }else return null
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) =>selectedCoins.includes(row.name) ? <Row row={row}  key={row.name}/> : null)}

                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={handleSave} variant={'contained'} size={'large'}>Зберегти</Button>
        </Box>

    );
};

export default TableComponent;