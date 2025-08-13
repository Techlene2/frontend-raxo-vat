import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const itemListTodo = createAsyncThunk('itemList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `item-masters${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const itemListSlice = createSlice({
    name: 'itemList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(itemListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(itemListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default itemListSlice.reducer; 