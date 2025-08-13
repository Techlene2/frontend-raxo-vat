import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const customerTypeListTodo = createAsyncThunk('customerTypeList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `customer-types${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const customerTypeListSlice = createSlice({
    name: 'customerTypeList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(customerTypeListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(customerTypeListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default customerTypeListSlice.reducer; 