import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCategoryTodo = createAsyncThunk('addCategory', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'categories',
            data: {
                "name": data && data.values && data.values.name,
                "description": data && data.values && data.values.description,
                "isActive": data && data.values && data.values.status
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})