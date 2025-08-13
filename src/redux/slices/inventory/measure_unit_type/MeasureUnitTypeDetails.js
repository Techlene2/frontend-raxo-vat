import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const measureUnitTypeDetailsTodo = createAsyncThunk('measureUnitTypeDetails', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `measurement-unit-types/${data.id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const measureUnitTypeDetailsSlice = createSlice({
    name: 'measureUnitTypeDetails',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(measureUnitTypeDetailsTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(measureUnitTypeDetailsTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default measureUnitTypeDetailsSlice.reducer; 