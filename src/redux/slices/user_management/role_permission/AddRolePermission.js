import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addRolePermissionTodo = createAsyncThunk('addRolePermission', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'role-permissions',
            data: {
                "roleId": data.values.role,
                "rolePermissionDTOS": data.permission
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})