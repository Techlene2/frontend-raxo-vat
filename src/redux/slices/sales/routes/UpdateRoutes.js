import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateRoutesTodo = createAsyncThunk('updateRoutes', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'routes',
            data: {
                "id": data.values && data.values.id,
                "name": data.values && data.values.name,
                "description": data.values && data.values.description,
                "isActive": data.values && data.values.status,
                "routeLocations": data.values && data.values.location,
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})