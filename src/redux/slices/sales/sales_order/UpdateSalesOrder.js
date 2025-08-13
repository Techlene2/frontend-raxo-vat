import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateSalesOrderTodo = createAsyncThunk('updateSalesOrder', async (data) => {
    let user = ''
    let item = data && data.values && data.values.item && data.values.item.map(val => ({
        "id": val.id,
        "itemMaster": { "id": val.item_id },
        "price": val.rate,
        "quantity": val.quantity,
        "subTotal": val.sub_total,
        "discountPer": val.discount,
        "taxRate": val.vat,
        "taxMaster": { "id": val.vat_id },
        "remarks": val.remark,
    }))

    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'customer-sales-orders',
            data: {
                "id": data && data.values && data.values.id,
                "customer": {
                    "id": data && data.values && data.values.customer
                },
                "saleType": data && data.values && data.values.sale_type,
                "despatchAddress": data && data.values && data.values.dispatch_address,
                "customerDispatchDetail": {
                    "id": data && data.values && data.values.dispatch_address_id
                },
                "currency": {
                    "id": data && data.values && data.values.currency_id
                },
                "user": {
                    "id": data && data.values && data.values.order_booked_by
                },
                "bookingDate": data && data.values && data.values.booking_date,
                "deliveryDate": data && data.values && data.values.delivery_date,
                "deliveryType": data && data.values && data.values.delivery_type,
                "deliveryTerms": data && data.values && data.values.delivery_terms,
                "paymentTerms": data && data.values && data.values.payment_terms,
                "custPoNo": data && data.values && data.values.customer_po_number,
                "custPoDate": data && data.values && data.values.customer_po_date,
                "designation": data && data.values && data.values.designation,
                "quotationCode": data && data.values && data.values.quotation_code,
                "creditDays": data && data.values && data.values.credit_days,
                "customerEndCode": data && data.values && data.values.our_code_customer_end,
                "remarks": data && data.values && data.values.remark,
                "customerSalesOrderItems": item
            },
            headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})