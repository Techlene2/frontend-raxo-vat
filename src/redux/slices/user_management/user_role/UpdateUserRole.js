import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserRoleTodo = createAsyncThunk('updateUserRole', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'user-roles',
            data: {
                "id": data.values && data.values.id,
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