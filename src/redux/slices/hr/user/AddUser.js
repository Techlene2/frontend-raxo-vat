import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addUserTodo = createAsyncThunk('addUser', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'users',
            data: {
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