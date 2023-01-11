import {apiSlice} from "../apiSlice";

export const groupsApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        fetchAllGroups: build.query({
            query: () => 'filter/filters'
        }),
        deleteGroup: build.mutation({
            query: filterId=>({
                url:'/filter/delete',
                method:'DELETE',
                body:{filterId}
            })
        })
    })
})

export const {useLazyFetchAllGroupsQuery, useDeleteGroupMutation} = groupsApiSlice