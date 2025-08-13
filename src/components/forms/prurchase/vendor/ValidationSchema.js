import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Vendor.js').default
} else {
    lang = require('../../../../lang/en/Vendor.js').default
}

export const AddVendorSchema = Yup.object({

    name: Yup.string().required(lang.error_name),
    address: Yup.string().required(lang.error_address),
    postalCode: Yup.string().required(lang.error_postal_code),
    panNo: Yup.string().required(lang.error_pan_no),
    tinNo: Yup.string().required(lang.error_tin_no),
    longitude: Yup.number().required(lang.error_longitude).typeError(lang.error_type_error),
    latitude: Yup.number().required(lang.error_latitude).typeError(lang.error_type_error),
    sourceApp: Yup.string().required(lang.error_source),
    city: Yup.string().required(lang.error_city),
    status: Yup.string().required(lang.error_status),

});