import React, {useState} from 'react';
import {Button, Dialog, Stack, TextField, Typography} from "@mui/material";
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
import {selectCurrentGroup, setGroup, selectGroups} from "../redux/groups/groupsSlice";
import {useCreateGroupMutation} from "../redux/groups/groupApiSlice";

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

const initialGroupData = {
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
const modifyNewGroupValues = (newGroup) => {
    let res = {}
    res.name = newGroup.name
    Object.keys(newGroup).forEach(el => {
        if (el !== 'name') res[el] = newGroup[el] !== '0'
    })
    return res
}

const Filter = () => {

    const [newGroup, setNewGroup] = useState(initialGroupData)
    const [createGroup] = useCreateGroupMutation()
    const handleChange = (key, value) => {
        setNewGroup(prev => {
            const group = {...prev}
            group[key] = value
            return group
        })
    }
    const [openDialog, setOpenDialog] = useState(false);

    const dispatch = useDispatch()

    const allCoins = useSelector(selectCurrentData)?.map(elem => elem?.name)
    const currentCoins = useSelector(selectCurrentCoins)

    const groups = useSelector(selectGroups)
    const currentGroup = useSelector(selectCurrentGroup)
    const handleAdd = async () => {
        try{
            console.log(modifyNewGroupValues(newGroup))
            await createGroup(newGroup).unwrap()
            setOpenDialog(false)
            alert('Добавлено групу '+newGroup.name+'. Оновіть сторінку')
            setNewGroup(initialGroupData)
        }catch (e){
            console.log(e)
            alert('Виникла помилка при додаванні фільра( деталі в консолі')
        }

    }
    const handleChangeCoins = (coins) => dispatch(changeCurrentCoins({coins}))
    const handleChangeGroup = e => dispatch(setGroup({groupName: e.target.value}))
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
            <Dialog maxWidth={false} open={openDialog} onClose={() => setOpenDialog(false)}>
                <Stack padding={2} bgcolor='#fff' borderRadius={2} alignItems={'center'}>
                    <Typography fontSize={22}>Добавлення нової групи</Typography>
                    <Typography fontSize={14} color={'grey'} marginBottom={1}>*поле name обовязкове</Typography>
                    <Stack display='flex' flexDirection='row' gap={1}>
                        {
                            Object.keys(newGroup).map(key =>
                                <TextField label={key} key={key} value={newGroup[key]}
                                           onChange={(e) => handleChange(key, e.target.value)}/>
                            )
                        }
                    </Stack>
                    <Button sx={{width: '30%', marginTop: 1}} variant={'contained'} onClick={handleAdd}>Додати</Button>

                </Stack>
            </Dialog>
            <Typography fontSize={18}>
                Сортування:
            </Typography>
            <FormControl sx={{m: 1, width: 260}} size="small">
                <InputLabel>Coin</InputLabel>
                <Select
                    multiple
                    value={currentCoins}
                    onChange={(e) => handleChangeCoins(e.target.value)}
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

            <FormControl size='small' sx={{width: 200}}>
                <InputLabel>Group</InputLabel>
                <Select
                    value={`${currentGroup.name}`}
                    label="Group"
                    onChange={handleChangeGroup}
                >
                    <MenuItem onClick={() => setOpenDialog(true)}>Додати фільтр</MenuItem>
                    {
                        groups?.map((group) => (
                            <MenuItem key={group?.name} value={group?.name}>{group?.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

        </Stack>
    );
};

export default Filter;
