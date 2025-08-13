import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const segmentListTodo = createAsyncThunk('segmentList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `segment-masters`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const segmentListSlice = createSlice({
    name: 'segmentList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(segmentListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(segmentListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default segmentListSlice.reducer; 