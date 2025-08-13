import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const regionListTodo = createAsyncThunk('regionList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `regions${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const regionListSlice = createSlice({
    name: 'regionList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(regionListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(regionListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default regionListSlice.reducer; 