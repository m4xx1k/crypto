import {apiSlice} from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: build=>({
        login: build.mutation({
            query: credentials=>({
                url:'/user/login',
                method:'POST',
                body:{...credentials}
            })
        }),
        registration: build.mutation({
            query: credentials=>({
                url: "/user/registration",
                method:"POST",
                body:{...credentials}
            }),
            invalidatesTags:['User']
        }),
        logout: build.mutation({
            query:()=> ({
                url:'/user/logout',
                method:'POST'
            })
        }),
        getAllUsers: build.query({
            query:()=>'/user/all',
            providesTags:['User']
        }),
        deleteUser: build.mutation({
            query:(login)=>({
                url:'/user/delete',
                method:"DELETE",
                body:{login}
            }),
            invalidatesTags:['User']

        })
    })
})

export const {useLoginMutation, useLogoutMutation, useRegistrationMutation, useGetAllUsersQuery, useDeleteUserMutation} = authApiSlice