import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/SubCategory.js').default
} else {
    lang = require('../../../../lang/en/SubCategory.js').default
}

export const SubCategorySchema = Yup.object({
    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_desc),
    status: Yup.string().required(lang.error_status),
    category: Yup.string().required(lang.error_category),
});