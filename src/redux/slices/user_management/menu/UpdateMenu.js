import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateMenuTodo = createAsyncThunk('updateMenu', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'main-menus',
            data: {
                "id": data.values && data.values.id,
                "name": data.values && data.values.menuName,
                "description": data.values && data.values.menuDesc,
                "icon": data.values && data.values.menuIcon,
                "isActive": data.values && data.values.status,
                "priority": data.values && data.values.menuPriority,
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})