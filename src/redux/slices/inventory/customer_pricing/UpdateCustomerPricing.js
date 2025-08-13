import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

export const updateCustomerPricingTodo = createAsyncThunk('updateCustomerPricing', async (data) => {
    let user = ''
    let product_price = data && data.values && data.values.product_price && data.values.product_price.map(val => ({
        "itemMaster": { "id": val.item_id },
        "price": val.new_rate,
        "remarks": val.remark,
    }))

    try {
        const res = await axios({

            method: 'POST',
            url: process.env.REACT_APP_API_URL + 'customer-pricings',
            data: {
                "customerId": data.filter && data.filter.customer,
                "subCategoryId": data.filter && data.filter.sub_cat,
                "brandId": data.filter && data.filter.brand,
                "wefDate": data.filter && moment(data.filter.effective_date).format("YYYY-MM-DD"),
                "withEffectiveDate": data.values && data.values.effective_from,
                "customerPricingDTOS": product_price
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})