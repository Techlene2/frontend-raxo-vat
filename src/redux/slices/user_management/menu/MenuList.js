import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const menuListTodo = createAsyncThunk('menuList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `main-menus${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const menuListSlice = createSlice({
    name: 'menuList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(menuListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(menuListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default menuListSlice.reducer; 