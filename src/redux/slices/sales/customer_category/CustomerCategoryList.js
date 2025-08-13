import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const customerCategoryListTodo = createAsyncThunk('customerCategoryList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `customer-categories${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const customerCategoryListSlice = createSlice({
    name: 'customerCategoryList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(customerCategoryListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(customerCategoryListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default customerCategoryListSlice.reducer; 