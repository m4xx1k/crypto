import {createSlice} from "@reduxjs/toolkit"

const tableState = createSlice({
    name: "table",
    initialState: {
        data: [],
        currentCoins: [],
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
        },
        changeCurrentCoins: (state, action) => {
            state.currentCoins = action.payload.coins
        },
        setData: (state, action) => {
            state.data = action.payload.data
        },
        addNewCoin: (state, action) => {
            const newCoin = {}
            for (let i = 1; i < 11; i++) {
                newCoin[`c${i}`] = "1"
            }
            state.data.push({...newCoin, name: action.payload})
            console.log(newCoin)
        }


    }
})

export const selectCurrentData = state => state.table.data
export const selectCurrentCoins = state => state.table.currentCoins
export const {changeValue, changeCurrentCoins, setData, addNewCoin} = tableState.actions

export default tableState.reducer