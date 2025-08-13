import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Vehicle.js').default
} else {
    lang = require('../../../../lang/en/Vehicle.js').default
}

export const AddVehicleSchema = Yup.object({

    registration_number: Yup.string().required(lang.error_registration_number),
    make: Yup.string().required(lang.error_make),
    model: Yup.string().required(lang.error_model),
    year: Yup.string().required(lang.error_year),
    color: Yup.string().required(lang.error_color),
    mileage: Yup.string().required(lang.error_mileage),
    capacity: Yup.string().required(lang.error_capacity),
    current_status: Yup.string().required(lang.error_current_status),

});