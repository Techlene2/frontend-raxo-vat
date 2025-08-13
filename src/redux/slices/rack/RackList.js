import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const rackListTodo = createAsyncThunk('rackList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `rack-masters`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const rackListSlice = createSlice({
    name: 'rackList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(rackListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(rackListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default rackListSlice.reducer; 