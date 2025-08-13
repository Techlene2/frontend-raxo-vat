import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addPermissionMenuTodo = createAsyncThunk('addPermissionMenu', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'permission-menus',
            data: {
                "name": data.values && data.values.name,
                "description": data.values && data.values.description,
                "subMenu": {
                    "id": data.values && data.values.subMenu
                },
                "actionAttributes": data.values && JSON.stringify(data.values.permission)
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})