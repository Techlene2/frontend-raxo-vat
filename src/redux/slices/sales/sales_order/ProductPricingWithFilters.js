import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const productPricingWithFiltersTodo = createAsyncThunk('productPricingWithFilters', async (data) => {
    let user = ''
    const baseURL = process.env.REACT_APP_API_URL + 'product-pricing-with-filters'
    const params = {};
    if (data.item) {
        params.itemName = data.item;
    }
    if (data.customer) {
        params.customerId = data.customer;
    }
    const queryString = new URLSearchParams(params).toString()

    try {
        const res = await axios({

            method: 'GET',
            url: process.env.REACT_APP_API_URL + `product-pricing-with-filters${data.search && '?' + data.search}`,
            url: `${baseURL}?${queryString}`,
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})

const productPricingWithFiltersSlice = createSlice({
    name: 'productPricingWithFilters',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(productPricingWithFiltersTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(productPricingWithFiltersTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default productPricingWithFiltersSlice.reducer; 