import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const colorListTodo = createAsyncThunk('colorList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `color-masters`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const colorListSlice = createSlice({
    name: 'colorList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(colorListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(colorListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default colorListSlice.reducer; 