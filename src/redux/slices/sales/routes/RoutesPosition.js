import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const routesPositionTodo = createAsyncThunk('routesPosition', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `route-position?routeId=${data.position}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const routesPositionSlice = createSlice({
    name: 'routesPosition',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(routesPositionTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(routesPositionTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default routesPositionSlice.reducer; 