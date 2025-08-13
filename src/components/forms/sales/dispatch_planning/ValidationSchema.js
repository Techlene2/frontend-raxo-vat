import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/DispatchPlanning.js').default
} else {
    lang = require('../../../../lang/en/DispatchPlanning.js').default
}

export const AddDispatchPlanningSchema = Yup.object({
    dispatch_date: Yup.string().required(lang.error_dispatch_date),
    driver: Yup.string().required(lang.error_driver),
    vehicle: Yup.string().required(lang.error_vehicle),
    route: Yup.string().required(lang.error_route),
    sales_order: Yup.array().min(1, lang.error_sales_order).required(lang.error_sales_order),
});