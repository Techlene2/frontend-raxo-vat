import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateCompanyBusinessAreaTodo = createAsyncThunk('updateCompanyBusinessArea', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'company-business-areas',
            data: {
                "id": data.values && data.values.id,
                "name": data.values && data.values.name,
                "description": data.values && data.values.description,
                "code": data.values && data.values.code,
                "address": data.values && data.values.address,
                "postalCode": data.values && data.values.postalCode,
                "phone": data.values && data.values.phone,
                "mobileNo": data.values && data.values.mobile,
                "email": data.values && data.values.email,
                "isActive": data.values && data.values.status,
                "company": {
                    "id": data.values && data.values.company
                },
                "city": {
                    "id": data.values && data.values.city
                }
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})