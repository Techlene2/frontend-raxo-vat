import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const salesOrderDetailsTodo = createAsyncThunk('salesOrderDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `customer-sales-orders/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const salesOrderDetailsSlice = createSlice({
    name: 'salesOrderDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(salesOrderDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(salesOrderDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default salesOrderDetailsSlice.reducer; 