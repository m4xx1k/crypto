import {createSlice} from "@reduxjs/toolkit"

const groupsSlice = createSlice({
    name: "groups",
    initialState: {

        groups:[],
        currentGroup:{},
    },

    reducers: {

        setGroup:(state,action)=>{
            const {groupName} = action.payload
            state.currentGroup= state.groups.find(elem => {
                return elem.name === groupName
            })

        },
        setGroups:(state,action)=>{
            state.groups = action.payload
        }


    }
})

export const selectCurrentGroup = state => state.groups.currentGroup
export const selectGroups = state=>state.groups.groups
export const {setGroups, setGroup} = groupsSlice.actions

export default groupsSlice.reducer