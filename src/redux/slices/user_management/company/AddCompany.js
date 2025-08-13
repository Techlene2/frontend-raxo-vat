import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCompanyTodo = createAsyncThunk('addCompany', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'companies',
            data: {
                "name": data.values && data.values.name,
                "address": data.values && data.values.address,
                "postalCode": data.values && data.values.postalCode,
                "website": data.values && data.values.website,
                "email": data.values && data.values.email,
                "telephone": data.values && data.values.telephone,
                "mobileNo": data.values && data.values.mobileNo,
                "fax": data.values && data.values.fax,
                "logo": data.values && data.values.logo,
                "typeOfCompany": data.values && data.values.typeOfCompany,
                "panNo": data.values && data.values.panNo,
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