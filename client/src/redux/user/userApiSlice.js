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
            })
        }),
        logout: build.mutation({
            query:()=> ({
                url:'/user/logout',
                method:'POST'
            })
        })
    })
})

export const {useLoginMutation, useLogoutMutation, useRegistrationMutation} = authApiSlice