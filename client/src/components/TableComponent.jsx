import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box} from "@mui/material";
import { useSelector} from "react-redux";
import {selectCurrentData, selectCurrentCoins} from "../redux/table/tableSlice";
import Row from "./Row";
import {selectCurrentGroup} from "../redux/groups/groupsSlice";

const TableComponent = () => {
    const data = useSelector(selectCurrentData)
    const group = useSelector(selectCurrentGroup)
    const selectedCoins = useSelector(selectCurrentCoins)
    console.log(data, 'tc d')
    return (
        <Box sx={{padding:2, maxWidth:"90vw"}} >
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
        </Box>

    );
};

export default TableComponent;