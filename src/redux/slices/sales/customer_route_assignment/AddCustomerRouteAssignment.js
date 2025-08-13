import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCustomerRouteAssignmentTodo = createAsyncThunk('addCustomerRouteAssignment', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'customer-route-assignments',
            data: {
                "customer": {
                    "id": data && data.values && data.values.customer
                },
                "route": {
                    "id": data && data.values && data.values.route
                }
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})