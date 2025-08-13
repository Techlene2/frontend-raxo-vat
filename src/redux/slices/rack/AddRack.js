import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addRackTodo = createAsyncThunk('addRack', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'rack-masters',
            data: {
                "rackNumber": data.values && data.values.name,
                "capacity": "",
                "location": ""
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})