import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const customerRouteAssignmentDetailsTodo = createAsyncThunk('customerRouteAssignmentDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `customer-route-assignments/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const customerRouteAssignmentDetailsSlice = createSlice({
    name: 'customerRouteAssignmentDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(customerRouteAssignmentDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(customerRouteAssignmentDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default customerRouteAssignmentDetailsSlice.reducer; 