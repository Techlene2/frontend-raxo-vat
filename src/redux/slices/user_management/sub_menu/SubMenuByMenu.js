import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const subMenubyMenuTodo = createAsyncThunk('subMenubyMenu', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: data.method,
            url: process.env.REACT_APP_API_URL + `sub-menus?mainMenuId=${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }
        })
        return res
    } catch (error) {
        return error.response
    }
})


const subMenubyMenuSlice = createSlice({
    name: 'subMenubyMenu',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(subMenubyMenuTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else if (action.payload && action.payload.status == 400) {

            } else {
                state.data = ''
            }

        });
        builder.addCase(subMenubyMenuTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default subMenubyMenuSlice.reducer; 