import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/MeasureUnitType.js').default
} else {
    lang = require('../../../../lang/en/MeasureUnitType.js').default
}

export const AddMeasureUnitTypeSchema = Yup.object({

    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_desc),
    status: Yup.string().required(lang.error_status)

});