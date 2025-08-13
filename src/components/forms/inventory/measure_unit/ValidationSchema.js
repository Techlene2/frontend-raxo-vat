import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/MeasureUnit.js').default
} else {
    lang = require('../../../../lang/en/MeasureUnit.js').default
}

export const AddMeasureUnitSchema = Yup.object({

    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_desc),
   // unitType: Yup.string().required(lang.error_unitType),

});