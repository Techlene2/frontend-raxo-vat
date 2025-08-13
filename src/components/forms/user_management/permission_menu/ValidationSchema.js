import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/PermissionMenu.js').default
} else {
    lang = require('../../../../lang/en/PermissionMenu.js').default
}

export const AddPermissionSchema = Yup.object({

    menu: Yup.string().required(lang.error_menu),
    subMenu: Yup.string().required(lang.error_sub_menu),
    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_desc),
    // route: Yup.string().required("Enter Route").matches(/^\/[a-zA-Z0-9_-]+$/, "Enter Correct Path"),
    permission: Yup.array().of(
        Yup.object().shape({
            actionName: Yup.string().required(lang.error_action_name),
            api: Yup.string().notRequired(""),
            route: Yup.string().required(lang.error_route_required).matches(/^\/[a-zA-Z0-9_-]+$/, lang.error_route_matches),
            showInMenu: Yup.string().required(lang.error_show_in_menu)
        }))

});