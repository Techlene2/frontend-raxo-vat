import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const taxTypeDetailsTodo = createAsyncThunk('taxTypeDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `tax-type-masters/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const taxTypeDetailsSlice = createSlice({
    name: 'taxTypeDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(taxTypeDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(taxTypeDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default taxTypeDetailsSlice.reducer; 