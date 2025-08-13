import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const sidebarTodo = createAsyncThunk('sidebar', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: "GET",
            url: process.env.REACT_APP_API_URL + 'admin/me',
            // data: {},
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }
        })
        return res
    } catch (error) {
        return error.response
    }
})


const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(sidebarTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(sidebarTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default sidebarSlice.reducer; 