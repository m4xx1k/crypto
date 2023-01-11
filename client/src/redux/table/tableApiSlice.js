import {apiSlice} from "../apiSlice";

export const tableApiSlice = apiSlice.injectEndpoints({
    endpoints: build=>({
        fetchAllCoins: build.query({
            query:()=> 'coin/coins'
        }),
        deleteCoin: build.mutation({
            query: name=>({
                url:'/coin/delete',
                method:'DELETE',
                body:{name}
            })
        }),
        saveCoin: build.mutation({

            query: data=>{
                console.log(data)
                return{
                    url:'/coin/redact',
                    method:"PUT",
                    body: {...data}
                }
            }


        })
    })
})

export const {useSaveCoinMutation, useLazyFetchAllCoinsQuery, useDeleteCoinMutation} = tableApiSlice