import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const routesListTodo = createAsyncThunk('routesList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `routes${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const routesListSlice = createSlice({
    name: 'routesList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(routesListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(routesListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default routesListSlice.reducer; 