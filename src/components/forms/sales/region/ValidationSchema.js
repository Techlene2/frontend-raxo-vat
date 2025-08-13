import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Region.js').default
} else {
    lang = require('../../../../lang/en/Region.js').default
}

export const AddRegionSchema = Yup.object({
    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_desc),
})