import * as Yup from 'yup';

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Role.js').default
} else {
    lang = require('../../../../lang/en/Role.js').default
}


export const RoleSchema = Yup.object({

    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_desc),
    status: Yup.string().required(lang.error_status),

});