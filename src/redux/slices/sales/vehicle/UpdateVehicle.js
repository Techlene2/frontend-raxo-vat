import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateVehicleTodo = createAsyncThunk('updateVehicle', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'vehicle-masters',
            data: {
                "id": data.values && data.values.id,
                "registrationNumber": data.values && data.values.registration_number,
                "make": data.values && data.values.make,
                "model": data.values && data.values.model,
                "year": data.values && data.values.year,
                "color": data.values && data.values.color,
                "mileage": data.values && data.values.mileage,
                "capacity": data.values && data.values.capacity,
                "currentStatus": data.values && data.values.current_status,
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})