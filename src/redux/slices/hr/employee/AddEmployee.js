import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addEmployeeTodo = createAsyncThunk('addEmployee', async (data) => {
    let user = ''

    var bodyFormData = new FormData();

    bodyFormData.append(
        'file', data.values && data.values.profile
    )

    bodyFormData.append(
        'type', 'user'
    )

    bodyFormData.append(
        'data', JSON.stringify({

            "userType": data.values && data.values.user_type,
            "firstName": data.values && data.values.firstName,
            "lastName": data.values && data.values.lastName,
            "dateOfBirth": data.values && data.values.dob,
            "gender": data.values && data.values.gender,
            "email": data.values && data.values.email,
            "fatherName": data.values && data.values.fatherName,
            "motherName": data.values && data.values.motherName,
            "mobileNo": data.values && data.values.mobileNo,
            "isActive": data.values && data.values.status,
            "user": data.values && data.values.isUser,

            "city": {
                "id": data.values && data.values.city
            },
            "postalCode": data.values && data.values.postalCode,
            "phoneNo": data.values && data.values.phoneNo,
            "address": data.values && data.values.address,

            "licenseNumber": data.values && data.values.license_no,
            "liceneceExpiryDate": data.values && data.values.license_expiry,
            "passportNo": data.values && data.values.passport_no,
            "passportExpiryDate": data.values && data.values.passport_expiry,
            "visaNumber": data.values && data.values.visa_no,
            "visaIssueDate": data.values && data.values.visa_issue,
            "visaExpiryDate": data.values && data.values.visa_expiry,

        })
    )

    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'employees',
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})