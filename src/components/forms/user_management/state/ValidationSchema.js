import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/State.js').default
} else {
    lang = require('../../../../lang/en/State.js').default
}


export const AddStateSchema = Yup.object({
    country: Yup.string().required(lang.error_country),
    stateName: Yup.string().required(lang.error_name),
    status: Yup.string().required(lang.error_status)
});