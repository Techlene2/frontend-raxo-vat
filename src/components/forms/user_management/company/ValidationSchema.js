import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Company.js').default
} else {
    lang = require('../../../../lang/en/Company.js').default
}

export const AddCompanySchema = Yup.object({

    name: Yup.string().required(lang.error_name),
    address: Yup.string().required(lang.error_address),
    postalCode: Yup.string().required(lang.error_postal_code),
    website: Yup.string().required(lang.error_website),
    email: Yup.string().email().required(lang.error_email),
    telephone: Yup.string().required(lang.error_telephone),
    mobileNo: Yup.string().required(lang.error_mobile_no),
    fax: Yup.string().required(lang.error_fax),
    logo: Yup.mixed().notRequired(lang.error_logo),
    typeOfCompany: Yup.string().required(lang.error_type_of_company),
    panNo: Yup.string().required(lang.error_pan_no),
    city: Yup.string().required(lang.error_city),

})