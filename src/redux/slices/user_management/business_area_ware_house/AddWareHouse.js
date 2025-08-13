import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addWareHouseTodo = createAsyncThunk('addWareHouse', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'business-area-ware-houses',
            data: {
                "name": data.values && data.values.name,
                "shortName": data.values && data.values.shortName,
                "address": data.values && data.values.address,
                "postalCode": data.values && data.values.postalCode,
                "email": data.values && data.values.email,
                "isActive": data.values && data.values.status,
                "businessAreaId": {
                    id: data.values && data.values.businessAreaId,
                }
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})