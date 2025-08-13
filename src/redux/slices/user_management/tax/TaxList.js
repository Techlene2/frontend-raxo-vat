import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const taxListTodo = createAsyncThunk('taxList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `tax-masters${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const taxListSlice = createSlice({
    name: 'taxList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(taxListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(taxListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default taxListSlice.reducer; 