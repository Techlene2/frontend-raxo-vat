import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateSubMenuTodo = createAsyncThunk('updateSubMenu', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'sub-menus',
            data: {
                "id": data.values && data.values.id,
                "name": data.values && data.values.subMenuName,
                "description": data.values && data.values.subMenuDesc,
                "icon": data.values && data.values.subMenuIcon,
                "priority": data.values && data.values.subMenuPriority,
                "mainMenu": {
                    "id": data.values && data.values.mainMenu
                }
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})