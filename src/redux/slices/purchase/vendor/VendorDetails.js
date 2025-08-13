import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const vendorDetailsTodo = createAsyncThunk('vendorDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `vendors/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const vendorDetailsSlice = createSlice({
    name: 'vendorDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(vendorDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(vendorDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default vendorDetailsSlice.reducer; 