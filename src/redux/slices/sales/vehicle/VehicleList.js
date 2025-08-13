import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const vehicleListTodo = createAsyncThunk('vehicleList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `vehicle-masters${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const vehicleListSlice = createSlice({
    name: 'vehicleList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(vehicleListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(vehicleListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default vehicleListSlice.reducer; 