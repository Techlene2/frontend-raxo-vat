import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const gradeListTodo = createAsyncThunk('gradeList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `grades${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const gradeListSlice = createSlice({
    name: 'gradeList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(gradeListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(gradeListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default gradeListSlice.reducer; 