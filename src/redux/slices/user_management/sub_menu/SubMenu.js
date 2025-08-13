import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const subMenuTodo = createAsyncThunk('subMenu', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: data.method,
            url: process.env.REACT_APP_API_URL + `sub-menus${data.search && '?' + data.search}${data.id && '/' + data.id}${data.mainMenuId && '?mainMenuId=' + data.mainMenuId}`,
            data: {
                "id": data.values && data.values.id,
                "name": data.values && data.values.subMenuName,
                "description": data.values && data.values.subMenuDesc,
                "icon": data.values && data.values.subMenuIcon,
                "priority": data.values && data.values.subMenuPriority,
                "mainMenu": {
                    "id": data.values && data.values.mainMenu
                }
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }
        })
        return res
    } catch (error) {
        return error.response
    }
})


const subMenuSlice = createSlice({
    name: 'subMenu',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(subMenuTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else if (action.payload && action.payload.status == 400) {

            } else {
                state.data = ''
            }

        });
        builder.addCase(subMenuTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default subMenuSlice.reducer; 