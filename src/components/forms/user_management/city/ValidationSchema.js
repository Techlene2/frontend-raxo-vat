import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/City.js').default
} else {
    lang = require('../../../../lang/en/City.js').default
}

export const AddCitySchema = Yup.object({
    country: Yup.string().required(lang.error_country),
    state: Yup.string().required(lang.error_state),
    cityName: Yup.string().required(lang.error_name),
    status: Yup.string().required(lang.error_status)
});