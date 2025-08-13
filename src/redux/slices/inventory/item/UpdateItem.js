import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateItemTodo = createAsyncThunk('updateItem', async (data) => {
    let user = ''

    var bodyFormData = new FormData();

    bodyFormData.append(
        'file', data.values && data.values.item_image
    )

    bodyFormData.append(
        'type', 'item'
    )

    bodyFormData.append(
        'data', JSON.stringify({
            "id": data.values && data.values.id,
            "subCategory": {
                "id": data.values && data.values.sub_category
            },
            "brandMaster": {
                "id": data.values && data.values.brand
            },
            "costCenterMaster": {
                "id": data.values && data.values.cost_center
            },
            "canBeSold": data.values && data.values.sold,
            "canBePurchased": data.values && data.values.purchased,
            "canBeReturn": data.values && data.values.return,

            "name": data.values && data.values.name,
            "description": data.values && data.values.description,
            "code": data.values && data.values.item_code,
            "imageUrl": data.values && data.values.item_image_old,
            "groupMaster": {
                "id": data.values && data.values.group
            },
            "measurementUnit": {
                "id": data.values && data.values.primary_unit
            },
            "barCode": data.values && data.values.barcode,
            "isActive": data.values && data.values.status,

            "taxMaster": {
                "id": data.values && data.values.tax
            },
            "secondaryUnit": {
                "id": data.values && data.values.secondary_unit
            },
            "color": {
                "id": data.values && data.values.color
            },
            "unitWeight": data.values && data.values.weight,
            "conversion": data.values && data.values.conversion,
            "segmentNo": {
                "id": data.values && data.values.segment
            },
            "rackAddress": {
                "id": data.values && data.values.rack
            },
            "sourceApp": data.values && data.values.sourceApp,
        })
    )

    try {
        const res = await axios({

            method: 'PUT',
            url: process.env.REACT_APP_API_URL + 'item-masters',
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + localStorage.getItem('user_token') }

        })
        return res
    } catch (error) {
        return error.response
    }
})