import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTaxTodo = createAsyncThunk('addTax', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'tax-masters',
            data: {
                "name": data.values && data.values.name,
                "description": data.values && data.values.description,
                "rate": data.values && data.values.rate,
                "sourceApp": data.values && data.values.source,
                "taxTypeMaster": {
                    "id": data.values && data.values.taxtype
                }
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})