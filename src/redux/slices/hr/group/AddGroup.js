import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addGroupTodo = createAsyncThunk('addGroup', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'group-masters',
            data: {
                "name": data.values && data.values.name,
                "description": data.values && data.values.description,
                "isActive": data.values && data.values.status,
                "sourceApp": data.values && data.values.source,
                "groupType": {
                    "id": data.values && data.values.grouptype
                },
                "parentGroup": {
                    "id": data.values && data.values.parentgroup
                },
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})