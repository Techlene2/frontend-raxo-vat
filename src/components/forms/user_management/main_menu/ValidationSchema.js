import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/MainMenu.js').default
} else {
    lang = require('../../../../lang/en/MainMenu.js').default
}

export const AddMainMenuSchema = Yup.object({

    menuName: Yup.string().required(lang.error_name),
    menuDesc: Yup.string().required(lang.error_desc),
    // route: Yup.string().required("Enter Menu Route").matches(/^\/[a-zA-Z0-9_-]+$/, "Enter Correct Path"),
    menuPriority: Yup.number().typeError(lang.error_priority_type_error).positive(lang.error_priority_positive).required(lang.error_priority_required),
    // showInMenu: Yup.string().required("Select Menu Status"),
    status: Yup.string().required(lang.error_status),
    menuIcon: Yup.string().required(lang.error_icon),

});