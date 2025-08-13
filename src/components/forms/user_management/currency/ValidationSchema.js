import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Currency.js').default
} else {
    lang = require('../../../../lang/en/Currency.js').default
}

export const AddCurrencySchema = Yup.object({

    name: Yup.string().required(lang.error_name),
    short_name: Yup.string().required(lang.error_short_name),
    symbol: Yup.string().required(lang.error_symbol),
    status: Yup.string().required(lang.error_status),
    country: Yup.string().required(lang.error_country),

});