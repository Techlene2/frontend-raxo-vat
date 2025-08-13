import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/BusinessAreaWareHouse.js').default
} else {
    lang = require('../../../../lang/en/BusinessAreaWareHouse.js').default
}

export const AddBusinessAreaWareHouseSchema = Yup.object({

    name: Yup.string().required(lang.error_name),
    shortName: Yup.string().required(lang.error_short_name),
    address: Yup.string().required(lang.error_address),
    postalCode: Yup.string().required(lang.error_postal_code),
    email: Yup.string().email().required(lang.error_email),
    businessAreaId: Yup.string().required(lang.error_business_area),
    status: Yup.string().required(lang.error_status),

})