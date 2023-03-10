import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentGroup} from "../redux/groups/groupsSlice";
import {changeValue, deleteCoin} from "../redux/table/tableSlice";
import {useDeleteCoinMutation} from "../redux/table/tableApiSlice";
import DeleteIcon from '@mui/icons-material/Delete';

const Row = ({row}) => {
    const dispatch = useDispatch()
    const group = useSelector(selectCurrentGroup)
    const [deleteCoinRequest] = useDeleteCoinMutation()

    const handleChange = (coin, column, newValue) => {
        dispatch(changeValue({coin, column, newValue}))
    }
    const handleDeleteCoin= async ()=>{
        dispatch(deleteCoin(row.name))
        await deleteCoinRequest(row.name)
    }

    return (
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell align="center" component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
                {row.full_name}
            </TableCell>
            {
                Object.keys(group).map(elem => {
                    if (group[elem] && elem !== "name" && elem!=='full_name') {
                        return (
                            <TableCell key={elem} align="center">
                                <TextField fullWidth size="small" value={row[elem]}
                                           onChange={(e) => handleChange(row.name, elem, e.target.value)}/>
                            </TableCell>
                        )
                    } else {
                        return null
                    }
                })
            }
            <TableCell>
                {/*<Button onClick={handleDeleteCoin} size='small' variant='contained' sx={{padding: 0, minWidth: "18px"}}*/}
                {/*               color='error'>-</Button>*/}
                <DeleteIcon color={'error'} sx={{cursor:"pointer"}} onClick={handleDeleteCoin} />
            </TableCell>
        </TableRow>
    );
};

export default Row;