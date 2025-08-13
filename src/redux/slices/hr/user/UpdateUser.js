import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserTodo = createAsyncThunk('updateUser', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'users',
            data: {
                // "id": data.values && data.values.id,
                // "login": "Durgeshh",
                // "firstName": "Durgeshh",
                // "lastName": "patil",
                // "email": "durgeshhpatil@gmail.com",
                // "imageUrl": "",
                // "activated": true,
                // "authorities": [
                //     "ROLE_USER",
                //     "ROLE_ADMIN"
                // ],
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})