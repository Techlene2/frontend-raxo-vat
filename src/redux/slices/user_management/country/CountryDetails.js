import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const countryDetailsTodo = createAsyncThunk('countryDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `countries/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const countryDetailsSlice = createSlice({
    name: 'countryDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(countryDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(countryDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default countryDetailsSlice.reducer; 