import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import moment from "moment"

export const customerPricingFilterTodo = createAsyncThunk('customerPricingFilter', async (data) => {
    let user = ''

    const baseURL = process.env.REACT_APP_API_URL + 'customer-pricing-with-filters'
    const params = {
        customerId: data.customer && data.customer,
        wefDate: data.date && moment(data.date).format("YYYY-MM-DD"),
        subCategoryId: data.sub_cat_id && data.sub_cat_id,
        brandId: data.brand_id && data.brand_id,
    }
    const queryString = new URLSearchParams(params).toString()

    try {
        const res = await axios({

            method: 'GET',
            url: `${baseURL}?${queryString}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const customerPricingFilterSlice = createSlice({
    name: 'customerPricingFilter',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(customerPricingFilterTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(customerPricingFilterTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default customerPricingFilterSlice.reducer; 