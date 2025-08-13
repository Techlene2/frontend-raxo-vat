import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addUserRoleTodo = createAsyncThunk('addUserRole', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'user-roles',
            data: {
                "user": {
                    "id": data.values && data.values.user,
                },
                "role": {
                    "id": data.values && data.values.role,
                }
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})