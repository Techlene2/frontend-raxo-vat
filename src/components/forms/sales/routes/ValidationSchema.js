import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Routes.js').default
} else {
    lang = require('../../../../lang/en/Routes.js').default
}

export const AddRoutesSchema = Yup.object({

    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_desc),
    status: Yup.string().required(lang.error_status),
    location: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required(lang.error_name),
            latitude: Yup.number().typeError(lang.error_type_error).required(lang.error_lat),
            longitude: Yup.number().typeError(lang.error_type_error).required(lang.error_lng),
        }))

});