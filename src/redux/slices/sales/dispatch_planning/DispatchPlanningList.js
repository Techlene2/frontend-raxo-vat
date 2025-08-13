import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const dispatchPlanningListTodo = createAsyncThunk('dispatchPlanningList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `despatch-plannings${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const dispatchPlanningListSlice = createSlice({
    name: 'dispatchPlanningList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(dispatchPlanningListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(dispatchPlanningListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default dispatchPlanningListSlice.reducer; 