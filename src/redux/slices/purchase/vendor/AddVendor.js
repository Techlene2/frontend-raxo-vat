import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addVendorTodo = createAsyncThunk('addVendor', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'vendors',
            data: {
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