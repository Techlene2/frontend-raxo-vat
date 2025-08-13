import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import moment from "moment"

export const productPricingListTodo = createAsyncThunk('productPricingList', async (data) => {
    let user = ''

    const baseURL = process.env.REACT_APP_API_URL + 'product-pricings'
    const params = {};
    if (data && data.pageSize) {
        params.pageSize = data.pageSize;
    }
    if (data && data.pageNo >= 0) {
        params.pageNo = data.pageNo;
    }
    if (data && data.search && data.search.search) {
        params.search = data.search.search;
    }
    if (data && data.search && data.search.withEffectiveDate) {
        params.withEffectiveDate = moment(data.search.withEffectiveDate).format("YYYY-MM-DD");
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

const productPricingListSlice = createSlice({
    name: 'productPricingList',
    initialState: {
        data: '',
    },
    extraReducers: (builder) => {
        builder.addCase(productPricingListTodo.fulfilled, (state, action) => {
            if (action.payload && action.payload.status == 200) {
                state.data = action.payload.data;
            } else {
                state.data = ''
            }

        });
        builder.addCase(productPricingListTodo.rejected, (state, action) => {
            // console.log('reject', action)
        })
    }
})

export default productPricingListSlice.reducer; 