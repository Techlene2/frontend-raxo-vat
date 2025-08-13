import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/CompanyBusinessArea.js').default
} else {
    lang = require('../../../../lang/en/CompanyBusinessArea.js').default
}

export const AddCompanyBusinessAreaSchema = Yup.object({

    company: Yup.string().required(lang.error_company),
    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_description),
    address: Yup.string().required(lang.error_address),
    code: Yup.string().required(lang.error_code),
    postalCode: Yup.string().required(lang.error_postal_code),
    email: Yup.string().email().required(lang.error_email),
    phone: Yup.string().required(lang.error_phone),
    mobile: Yup.string().required(lang.error_mobile_no),
    city: Yup.string().required(lang.error_city),
    status: Yup.string().required(lang.error_status),

})