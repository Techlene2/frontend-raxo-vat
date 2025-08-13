import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addDepartmentTodo = createAsyncThunk('addDepartment', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'departments',
            data: {
                "name": data.values && data.values.name,
                "description": data.values && data.values.description,
                "isDisable": data.values && data.values.status
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})