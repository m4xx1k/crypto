import React, {useState} from 'react';
import {Button, Dialog, Popover, Stack, TextField, Typography} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentData,

    changeCurrentCoins, selectCurrentCoins
} from "../redux/table/tableSlice";
import {selectCurrentGroup, setGroup, selectGroups} from "../redux/groups/groupsSlice";
import {useCreateGroupMutation} from "../redux/groups/groupApiSlice";
import {FixedSizeList as List} from 'react-window';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const initialGroupData = {
    name: '',
    img: '0',
    price: '0',
    ath_price: '0',
    ath_time: '0',
    atl_price: '0',
    atl_time: '0',
    market_cap: '0',
    total_supply: '0',
    full_name: '0',
    c1:'0',
    c2:'0',
    c3:'0',
    c4:'0',
    c5:'0',
    c6:'0',
    c7:'0',
    c8:'0',
    c9:'0',
    c10:'0'
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
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

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


    const CoinSelect = ({index, style}) => {
        const coin = allCoins[index]
        return (<MenuItem sx={style} key={coin} value={coin} onClick={() => handleChangeCoins(coin)}>
            <Checkbox checked={currentCoins.includes(coin)}/>
            <ListItemText primary={coin}/>
        </MenuItem>)
    }

    const allCoins = useSelector(selectCurrentData)?.map(elem => elem?.name)
    const currentCoins = useSelector(selectCurrentCoins)
    const handleChangeCoins = (coin) => {
        dispatch(changeCurrentCoins(coin))
    }
    const groups = useSelector(selectGroups)
    const currentGroup = useSelector(selectCurrentGroup)
    const handleAdd = async () => {
        try {
            console.log(modifyNewGroupValues(newGroup))
            await createGroup(newGroup).unwrap()
            setOpenDialog(false)
            alert('Добавлено групу ' + newGroup.name + '. Оновіть сторінку')
            setNewGroup(initialGroupData)
        } catch (e) {
            console.log(e)
            alert('Виникла помилка при додаванні фільра( деталі в консолі')
        }

    }

    const handleChangeGroup = e => dispatch(setGroup({groupName: e.target.value}))
    return (<Stack width="100%"
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
                <Typography fontSize={14} color={'grey'} marginBottom={1}>*поле name обовязкове, значення 0 - не показується. 1 - показується</Typography>
                <Stack display='flex' flexDirection='row' gap={1} overflow={'scroll'} maxWidth={'85vw'} height='100px' alignItems={'center'}>
                    {
                        Object.keys(newGroup).map(key =>
                            <TextField sx={{minWidth:"100px"}} label={key} key={key} value={newGroup[key]}
                                       onChange={(e) => handleChange(key, e.target.value)}
                            />)
                    }
                </Stack>
                <Button sx={{width: '30%', marginTop: 1}} variant={'contained'} onClick={handleAdd}>Додати</Button>

            </Stack>
        </Dialog>
        <Typography fontSize={18}>
            Сортування:
        </Typography>
        <FormControl sx={{m: 1, width: 260}} size="small">

            <Button onClick={handleClick} variant={'outlined'} sx={{width: 200}}>
                <Typography textOverflow={'ellipsis'}>
                    Вибрати монети </Typography>

                {
                    Boolean(anchorEl) ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>
                }
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom', horizontal: 'left',
                }}
            >
                <List
                    height={250}
                    itemCount={allCoins.length}
                    itemSize={35}
                    width={200}>
                    {CoinSelect}
                </List>
            </Popover>

        </FormControl>

        <FormControl size='small' sx={{width: 200}}>
            <InputLabel>Group</InputLabel>
            <Select
                value={`${currentGroup.name}`}
                label="Group"
                onChange={handleChangeGroup}
            >
                <MenuItem onClick={() => setOpenDialog(true)}>Додати фільтр</MenuItem>
                {groups?.map((group) => (<MenuItem key={group?.name} value={group?.name}>{group?.name}</MenuItem>))}
            </Select>
        </FormControl>

    </Stack>);
};

export default Filter;
