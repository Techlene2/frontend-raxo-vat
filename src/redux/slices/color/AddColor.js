import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addColorTodo = createAsyncThunk('addColor', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'color-masters',
            data: {
                "colorName": data.values && data.values.name,
                "hexCode": "",
                "rgbValue": ""
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})