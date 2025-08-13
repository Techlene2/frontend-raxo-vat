import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const SignInTodo = createAsyncThunk('SignIn', async (data) => {
    try {
        const res = await axios({

            method: "post",
            url: process.env.REACT_APP_API_URL + 'authenticate',
            data: {
                "username": data.user,
                "password": data.password
            },
            headers: { "Content-Type": "application/json" }
        })
        return res
    } catch (error) {
        return error.response
    }
})