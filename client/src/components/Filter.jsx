import React from 'react';
import {Stack, Typography} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentData,

    changeCurrentCoins,
    selectCurrentCoins
} from "../redux/table/tableSlice";
import {selectCurrentGroup, setGroup,selectGroups} from "../redux/groups/groupsSlice";

const ITEM_HEIGHT = 32;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 180,
        },
    },
};




const Filter = () => {
    const dispatch = useDispatch()

    const allCoins = useSelector(selectCurrentData)?.map(elem=>elem?.name)
    const currentCoins = useSelector(selectCurrentCoins)

    const groups = useSelector(selectGroups)
    const currentGroup = useSelector(selectCurrentGroup)
    const handleChangeCoins = (coins) => dispatch(changeCurrentCoins({coins}))
    const handleChangeGroup = e => dispatch(setGroup({groupName:e.target.value}))
    return (
        <Stack width="100%"
               maxWidth="75vw"
               display="flex"
               flexDirection={{xs: "column", md: "row"}}
               alignItems="center"
               gap={1}
               bgcolor="#fff"
               borderRadius={2}
               padding={1}
                justifyContent="space-evenly"
        >
            <Typography fontSize={18}>
                Сортування:
            </Typography>
            <FormControl sx={{m: 1, width: 260}} size="small">
                <InputLabel>Coin</InputLabel>
                <Select
                    multiple
                    value={currentCoins}
                    onChange={(e)=>handleChangeCoins(e.target.value)}
                    input={<OutlinedInput label="Coin"/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {allCoins.map((coin) => (
                        <MenuItem sx={{height: "30px"}} key={coin} value={coin}>
                            <Checkbox checked={currentCoins.includes(coin)}/>
                            <ListItemText primary={coin}/>
                        </MenuItem>
                    ))}
                </Select>

            </FormControl>

            <FormControl size='small' sx={{width:200}}>
                <InputLabel>Group</InputLabel>
                <Select
                    value={`${currentGroup.name}`}
                    label="Group"
                    onChange={handleChangeGroup}
                >
                    {
                        groups?.map((group)=>(
                            <MenuItem key={group?.name} value={group?.name}>{group?.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

        </Stack>
    );
};

export default Filter;