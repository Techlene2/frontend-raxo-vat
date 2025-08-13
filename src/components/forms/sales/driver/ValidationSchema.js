import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Driver.js').default
} else {
    lang = require('../../../../lang/en/Driver.js').default
}

export const AddDriverSchema = Yup.object({
    name: Yup.string().required(lang.error_name),
    date_of_birth: Yup.string().required(lang.error_date_of_birth),
    gender: Yup.string().required(lang.error_gender),
    contact: Yup.number().required(lang.error_contact),
    address: Yup.string().required(lang.error_address),
    license_number: Yup.string().required(lang.error_license_number),
    license_expiry_date: Yup.string().required(lang.error_license_expiry_date),

});