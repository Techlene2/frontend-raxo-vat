import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const groupTypeDetailsTodo = createAsyncThunk('groupTypeDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `group-types/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const groupTypeDetailsSlice = createSlice({
    name: 'groupTypeDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(groupTypeDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(groupTypeDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default groupTypeDetailsSlice.reducer; 