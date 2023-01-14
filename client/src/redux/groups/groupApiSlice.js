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
        }),
        createGroup: build.mutation({
            query: body=>({
                url:'/filter/create',
                method:"POST",
                body
            })
        })
    })
})

export const {useLazyFetchAllGroupsQuery, useCreateGroupMutation} = groupsApiSlice