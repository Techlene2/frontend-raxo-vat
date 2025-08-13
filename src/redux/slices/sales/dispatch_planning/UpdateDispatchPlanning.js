import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateDispatchPlanningTodo = createAsyncThunk('updateDispatchPlanning', async (data) => {
    let user = ''
    const orders = data && data.values && data.values.sales_order && data.values.sales_order.map((val) => ({
        "id": val.id,
        "customerSalesOrder": {
            "id": val.so_id
        },
        "isActive": true
    }))

    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'despatch-plannings',
            data: {
                "id": data && data.values && data.values.id,
                "date": data && data.values && data.values.dispatch_date,
                "driver": {
                    "id": data && data.values && data.values.driver
                },
                "vehicle": {
                    "id": data && data.values && data.values.vehicle
                },
                "route": {
                    "id": data && data.values && data.values.route
                },
                "despatchPlanningDetails": orders,
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})