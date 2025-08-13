import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const delCompanyTodo = createAsyncThunk('delCompany', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'DELETE',
            url: process.env.REACT_APP_API_URL + `companies/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})