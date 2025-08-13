import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Country.js').default
} else {
    lang = require('../../../../lang/en/Country.js').default
}

export const AddCountrySchema = Yup.object({
    countryName: Yup.string().required(lang.error_name),
    status: Yup.string().required(lang.error_status)
});