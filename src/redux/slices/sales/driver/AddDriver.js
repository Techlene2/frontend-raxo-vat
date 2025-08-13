import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addDriverTodo = createAsyncThunk('addDriver', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'driver-masters',
            data: {
                "name": data.values && data.values.name,
                "dateOfBirth": data.values && data.values.date_of_birth,
                "gender": data.values && data.values.gender,
                "contactInfo": data.values && data.values.contact,
                "address": data.values && data.values.address,
                "licenseNumber": data.values && data.values.license_number,
                "licenseExpiryDate": data.values && data.values.license_expiry_date,
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})