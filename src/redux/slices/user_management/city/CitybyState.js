import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const citybyStateTodo = createAsyncThunk('citybyState', async (id) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `cities-by-state${'/' + id}`,
            // data: { },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }
        })
        return res
    } catch (error) {
        return error.response
    }
})


const citybyStateSlice = createSlice({
    name: 'citybyState',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(citybyStateTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(citybyStateTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default citybyStateSlice.reducer; 