import * as Yup from 'yup';

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Tax.js').default
} else {
    lang = require('../../../../lang/en/Tax.js').default
}

export const TaxSchema = Yup.object({

    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_desc),
    rate: Yup.string().required(lang.error_tax_rate),
    source: Yup.string().required(lang.error_source),
    taxtype: Yup.string().required(lang.error_tax_type),

});