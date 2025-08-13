import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Employee.js').default
} else {
    lang = require('../../../../lang/en/Employee.js').default
}

export const AddEmployeeSchema = Yup.object({

    user_type: Yup.string().required(lang.error_user_type),
    firstName: Yup.string().required(lang.error_first_name),
    lastName: Yup.string().required(lang.error_last_name),
    dob: Yup.string().required(lang.error_dob),
    gender: Yup.string().required(lang.error_gender),
    email: Yup.string().email().required(lang.error_email),
    fatherName: Yup.string().required(lang.error_father_name),
    motherName: Yup.string().required(lang.error_mother_name),
    mobileNo: Yup.string().required(lang.error_mobile_no),
    status: Yup.string().required(lang.error_status),
    profile: Yup.mixed().notRequired(lang.error_profile),
    isUser: Yup.boolean().required(lang.error_isUser),

    city: Yup.string().required(lang.error_city),
    postalCode: Yup.string().required(lang.error_postal_code),
    phoneNo: Yup.string().required(lang.error_phone_no),
    address: Yup.string().required(lang.error_address),

    license_no: Yup.string().notRequired(lang.error_license_no),
    license_expiry: Yup.string().notRequired(lang.error_license_expiry),
    passport_no: Yup.string().notRequired(lang.error_passport_no),
    passport_expiry: Yup.string().notRequired(lang.error_passport_expiry),
    visa_no: Yup.string().notRequired(lang.error_visa_no),
    visa_issue: Yup.string().notRequired(lang.error_visa_issue),
    visa_expiry: Yup.string().notRequired(lang.error_visa_expiry),

});