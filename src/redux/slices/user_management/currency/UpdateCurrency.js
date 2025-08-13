import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateCurrencyTodo = createAsyncThunk('updateCurrency', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'currencies',
            data: {
                "id": data.values && data.values.id,
                "name": data.values && data.values.name,
                "shortName": data.values && data.values.short_name,
                "symbol": data.values && data.values.symbol,
                "isActive": data.values && data.values.status,
                "country": {
                    "id": data.values && data.values.country
                }
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})