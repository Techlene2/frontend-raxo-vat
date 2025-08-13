import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Grade.js').default
} else {
    lang = require('../../../../lang/en/Grade.js').default
}

export const AddGradeSchema = Yup.object({
    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_desc),
});