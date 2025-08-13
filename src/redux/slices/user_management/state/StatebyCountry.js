import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const statebyCountryTodo = createAsyncThunk('statebyCountry', async (id) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `states-by-country${'/' + id}`,
            // data: { },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }
        })
        return res
    } catch (error) {
        return error.response
    }
})


const statebyCountrySlice = createSlice({
    name: 'statebyCountry',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(statebyCountryTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(statebyCountryTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default statebyCountrySlice.reducer; 