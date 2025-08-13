import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/SubMenu.js').default
} else {
    lang = require('../../../../lang/en/SubMenu.js').default
}

export const AddSubMenuSchema = Yup.object({

    subMenuName: Yup.string().required(lang.error_name),
    subMenuDesc: Yup.string().required(lang.error_desc),
    // route: Yup.string().required("Enter Route"),
    subMenuPriority: Yup.number().typeError(lang.error_priority_type_error).positive(lang.error_priority_positive).required(lang.error_priority_required),
    // showInMenu: Yup.string().required("Select Show In Menu"),
    mainMenu: Yup.string().required(lang.error_main_menu),
    subMenuIcon: Yup.string().required(lang.error_icon),

});