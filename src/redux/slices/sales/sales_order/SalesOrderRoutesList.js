import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import moment from "moment"

export const salesOrderRoutesListTodo = createAsyncThunk('salesOrderRoutesList', async (data) => {
    let user = ''
    const baseURL = process.env.REACT_APP_API_URL + 'sales-orders-route-planning'
    const params = {};
    if (data.date) {
        params.deliveryDate = moment(data.date).format("YYYY-MM-DD");
    }
    if (data.route) {
        params.routeId = data.route;
    }
    const queryString = new URLSearchParams(params).toString()

    try {
        const res = await axios({

            method: 'GET',
            url: `${baseURL}?${queryString}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const salesOrderRoutesListSlice = createSlice({
    name: 'salesOrderRoutesList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(salesOrderRoutesListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(salesOrderRoutesListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default salesOrderRoutesListSlice.reducer; 