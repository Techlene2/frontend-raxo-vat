import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/UserRole.js').default
} else {
    lang = require('../../../../lang/en/UserRole.js').default
}

export const AddUserRoleSchema = Yup.object({

    user: Yup.string().required(lang.error_user),
    role: Yup.string().required(lang.error_role),

})