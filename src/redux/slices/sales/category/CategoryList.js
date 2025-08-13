import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const categoryListTodo = createAsyncThunk('categoryList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `categories${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const categoryListSlice = createSlice({
    name: 'categoryList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(categoryListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(categoryListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default categoryListSlice.reducer; 