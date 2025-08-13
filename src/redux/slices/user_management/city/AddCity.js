import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCityTodo = createAsyncThunk('addCity', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'cities',
            data: {
                "name": data.values && data.values.cityName,
                "isActive": data.values && data.values.status,
                "state": {
                    "id": data.values && data.values.state
                }
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})