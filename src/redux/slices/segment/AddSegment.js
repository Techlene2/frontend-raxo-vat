import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addSegmentTodo = createAsyncThunk('addSegment', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'segment-masters',
            data: {
                "segmentName": data.values && data.values.name,
                "description": "",
                "isActive": ""
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})