import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateCustomerTodo = createAsyncThunk('updateCustomer', async (data) => {
    let user = ''
    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'customers',
            data: {
                "id": data.values && data.values.id,
                "name": data.values && data.values.customer_name,
                "customerCategory": {
                    "id": data.values && data.values.customer_category
                },
                "grade": {
                    "id": data.values && data.values.grade
                },

                "customerType": {
                    "id": data.values && data.values.customer_type
                },
                "postalCode": data.values && data.values.postal_code,
                "city": {
                    "id": data.values && data.values.city
                },
                "poBox": data.values && data.values.po_box,
                "webSite": data.values && data.values.website,
                "fax": data.values && data.values.fax,
                "officeContactNo": data.values && data.values.office_no,
                "address": data.values && data.values.address,
                "isActive": data.values && data.values.status,

                "personDetailsEntities": data.values && data.values.person,

                "taxType": {
                    "id": data.values && data.values.tax_type
                },
                "currency": {
                    "id": data.values && data.values.currency
                },
                "customerGroup": {
                    "id": data.values && data.values.customer_group
                },
                "blackListed": data.values && data.values.black_listed,
                "region": {
                    "id": data.values && data.values.region
                },
                "vatNo": data.values && data.values.vat_no,
                "panNo": data.values && data.values.pan_no,
                "registrationNo": data.values && data.values.registration_no,
                "creditDays": data.values && data.values.credit_days,
                "creditLimit": data.values && data.values.credit_limit,
                "lattitude": parseFloat(data.values && data.values.lat),
                "longitude": parseFloat(data.values && data.values.lng),
                // "sourceApp": "Auto Loan Account invoice",
                "dispatchDetails": data.values && data.values.dispatch,
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})