import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const cityDetailsTodo = createAsyncThunk('cityDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `cities/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const cityDetailsSlice = createSlice({
    name: 'cityDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(cityDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(cityDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default cityDetailsSlice.reducer; 