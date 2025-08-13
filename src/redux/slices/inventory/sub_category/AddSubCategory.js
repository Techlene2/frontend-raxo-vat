import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addSubCategoryTodo = createAsyncThunk('addSubCategory', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'sub-categories',
            data: {
                "name": data.values && data.values.name,
                "description": data.values && data.values.description,
                "isActive": data.values && data.values.status,
                "category": {
                    "id": data.values && data.values.category
                },
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})