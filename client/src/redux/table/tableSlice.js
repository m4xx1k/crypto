import {createSlice} from "@reduxjs/toolkit"

const tableState = createSlice({
    name: "table",
    initialState: {
        data: [],
        currentCoins: [],
        changedCoinsNames:[],
    },

    reducers: {
        changeValue: (state, action) => {
            const {coin, column, newValue} = action.payload
            state.data = state.data.map(row => {
                if (row.name === coin) {
                    const newRow = row
                    row[column] = newValue
                    return newRow
                } else
                    return row

            })
            if(!state.changedCoinsNames.includes(coin)) state.changedCoinsNames.push(coin)
        },
        changeCurrentCoins: (state, action) => {
            state.currentCoins = action.payload.coins
        },
        setData: (state, action) => {
            state.data = action.payload.data
        },
        addNewCoin: (state, action) => {
            state.data.push(action.payload)
            console.log(action.payload)
        },


    }
})

export const selectCurrentData = state => state.table.data
export const selectCurrentCoins = state => state.table.currentCoins
export const selectChangedCoinsNames = state=>state.table.changedCoinsNames
export const {changeValue, changeCurrentCoins, setData, addNewCoin} = tableState.actions

export default tableState.reducer