import * as Yup from 'yup';

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/RolePermission.js').default
} else {
    lang = require('../../../../lang/en/RolePermission.js').default
}

export const RolePermissionSchema = Yup.object({

    role: Yup.string().required(lang.error_role),
    permission: Yup.array().min(1, lang.error_permission).of(Yup.object().shape({}), lang.error_permission)
});