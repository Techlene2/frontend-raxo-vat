import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/CustomerRouteAssignment.js').default
} else {
    lang = require('../../../../lang/en/CustomerRouteAssignment.js').default
}

export const AddCustomerRouteAssignmentSchema = Yup.object({
    customer: Yup.string().required(lang.error_customer),
    route: Yup.string().required(lang.error_route),
})