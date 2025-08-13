import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const routesDetailsTodo = createAsyncThunk('routesDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `routes/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const routesDetailsSlice = createSlice({
    name: 'routesDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(routesDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(routesDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default routesDetailsSlice.reducer; 