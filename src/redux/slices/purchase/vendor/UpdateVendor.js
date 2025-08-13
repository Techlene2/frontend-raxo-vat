import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateVendorTodo = createAsyncThunk('updateVendor', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'vendors',
            data: {
                "id": data.values.id,
                "name": data.values.name,
                "address": data.values.address,
                "postalCode": data.values.postalCode,
                "panNo": data.values.panNo,
                "tinNo": data.values.tinNo,
                "longitude": data.values.longitude,
                "lattitude": data.values.latitude,
                "sourceApp": data.values.sourceApp,
                "isActive": data.values.status,
                "city": {
                    "id": data.values.city
                },
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})