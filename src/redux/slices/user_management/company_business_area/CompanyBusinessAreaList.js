import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const companyBusinessAreaListTodo = createAsyncThunk('companyBusinessAreaList', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `company-business-areas${data.search && '?' + data.search}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const companyBusinessAreaListSlice = createSlice({
    name: 'companyBusinessAreaList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(companyBusinessAreaListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(companyBusinessAreaListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default companyBusinessAreaListSlice.reducer; 