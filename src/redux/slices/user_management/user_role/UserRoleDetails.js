import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const userRoleDetailsTodo = createAsyncThunk('userRoleDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `user-roles/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const userRoleDetailsSlice = createSlice({
    name: 'userRoleDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(userRoleDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(userRoleDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default userRoleDetailsSlice.reducer; 