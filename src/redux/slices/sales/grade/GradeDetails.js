import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const gradeDetailsTodo = createAsyncThunk('gradeDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `grades/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const gradeDetailsSlice = createSlice({
    name: 'gradeDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(gradeDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(gradeDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default gradeDetailsSlice.reducer; 