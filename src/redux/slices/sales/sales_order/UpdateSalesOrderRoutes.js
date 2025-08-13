import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateSalesOrderRouteTodo = createAsyncThunk('updateSalesOrderRoute', async (data) => {
    let user = ''
    let route = data && data.values && data.values.sales && data.values.sales.map(val => ({
        "id": val.so_id,
        "routeId": val.route_id,
    }))

    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'customer-sales-orders/routes',
            data: route,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})