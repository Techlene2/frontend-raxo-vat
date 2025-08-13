import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Customer.js').default
} else {
    lang = require('../../../../lang/en/Customer.js').default
}

export const AddCustomerSchema = Yup.object({

    customer_name: Yup.string().required(lang.error_customer_name),
    short_name: Yup.string().notRequired(lang.error_short_name),
    customer_category: Yup.string().required(lang.error_customer_category),
    grade: Yup.string().required(lang.error_grade),

    customer_type: Yup.string().required(lang.error_customer_type),
    postal_code: Yup.string().required(lang.error_postal_code),
    city: Yup.string().required(lang.error_city),
    po_box: Yup.string().notRequired(lang.error_po_box),
    website: Yup.string().notRequired(lang.error_website),
    fax: Yup.string().notRequired(lang.error_fax),
    office_no: Yup.number().typeError(lang.error_type_error).notRequired(lang.error_office_no),
    address: Yup.string().notRequired(lang.error_address),
    status: Yup.string().notRequired(lang.error_status),

    person: Yup.array().of(
        Yup.object().shape({
            personName: Yup.string().notRequired(lang.error_person_name),
            designation: Yup.string().notRequired(lang.error_designation),
            department: Yup.string().notRequired(lang.error_department),
            mobile: Yup.number().typeError(lang.error_type_error).notRequired(lang.error_mobile),
            email: Yup.string().email().notRequired(lang.error_email),
        })),

    tax_type: Yup.string().required(lang.error_tax_type),
    currency: Yup.string().required(lang.error_currency),
    customer_group: Yup.string().required(lang.error_customer_group),
    black_listed: Yup.string().notRequired(lang.error_black_listed),
    region: Yup.string().notRequired(lang.error_region),
    vat_no: Yup.string().required(lang.error_vat_no),
    pan_no: Yup.string().required(lang.error_pan_no),
    registration_no: Yup.string().notRequired(lang.error_register_no),
    credit_days: Yup.number().typeError(lang.error_type_error).notRequired(lang.error_credit_days),
    credit_limit: Yup.number().typeError(lang.error_type_error).notRequired(lang.error_credit_limit),
    lat: Yup.number().typeError(lang.error_type_error).required(lang.error_lat),
    lng: Yup.number().typeError(lang.error_type_error).required(lang.error_lng),

    dispatch: Yup.array().of(
        Yup.object().shape({
            personName: Yup.string().required(lang.error_person_name),
            email: Yup.string().email().required(lang.error_email),
            phone: Yup.number().typeError(lang.error_type_error).required(lang.error_mobile),
            city: Yup.string().required(lang.error_city),
            address: Yup.string().required(lang.error_address),
            dispatchPin: Yup.number().typeError(lang.error_type_error).required(lang.error_pin),
            dispatchGSTNo: Yup.string().required(lang.error_gst_no),
            priority: Yup.number().typeError(lang.error_type_error).required(lang.error_priority),
        })),

});