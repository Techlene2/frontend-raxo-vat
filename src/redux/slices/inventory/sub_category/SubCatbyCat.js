import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const subCatbyCatTodo = createAsyncThunk('subCatbyCat', async (id) => {
    let user = ''
    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `subCategories-by-category/${id}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const subCatbyCatSlice = createSlice({
    name: 'subCatbyCat',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(subCatbyCatTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(subCatbyCatTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default subCatbyCatSlice.reducer; 