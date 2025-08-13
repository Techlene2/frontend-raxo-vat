import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/CustomerSalesOrder.js').default
} else {
    lang = require('../../../../lang/en/CustomerSalesOrder.js').default
}


export const AddSalesOrderSchema = Yup.object({
    customer: Yup.string().required(lang.error_customer),
    sale_type: Yup.string().notRequired(lang.sale_type),
    dispatch_address: Yup.string().notRequired(''),
    dispatch_address_id: Yup.string().required(lang.error_address),
    currency_id: Yup.string().required(lang.error_currency),
    currency: Yup.string().required(lang.error_currency),
    order_booked_by: Yup.string().required(lang.error_user),
    booking_date: Yup.string().required(lang.error_booking_date),
    delivery_date: Yup.string().required(lang.error_delivery_date),
    delivery_type: Yup.string().required(lang.error_delivery_type),
    delivery_terms: Yup.string().notRequired(lang.error_delivery_terms),
    payment_terms: Yup.string().notRequired(lang.error_payment_terms),
    customer_po_number: Yup.string().required(lang.error_po_number),
    customer_po_date: Yup.string().required(lang.error_po_date),
    designation: Yup.string().notRequired(lang.error_designation),
    quotation_code: Yup.string().notRequired(lang.error_quotation_code),
    credit_days: Yup.number().positive(lang.error_positive).notRequired(lang.error_credit_days),
    our_code_customer_end: Yup.string().notRequired(lang.error_code),
    remark: Yup.string().notRequired(lang.error_remark),

    item: Yup.array().of(
        Yup.object().shape({
            item_id: Yup.string().required(lang.error_item),
            rate: Yup.number().when("item_id", (val, schema) => {
                if (val[0]) {
                    return Yup.number().positive(lang.error_positive).required(lang.error_rate)
                } else {
                    return Yup.number().positive(lang.error_positive).notRequired()
                }
            }),
            quantity: Yup.number().when("item_id", (val, schema) => {
                if (val[0]) {
                    return Yup.number().positive(lang.error_positive).required(lang.error_quantity)
                } else {
                    return Yup.number().positive(lang.error_positive).notRequired()
                }
            }),
            unit: Yup.string().when("item_id", (val, schema) => {
                if (val[0]) {
                    return Yup.string().required(lang.error_unit)
                } else {
                    return Yup.string().notRequired()
                }
            }),
            unit_id: Yup.string().when("item_id", (val, schema) => {
                if (val[0]) {
                    return Yup.string().required(lang.error_unit)
                } else {
                    return Yup.string().notRequired()
                }
            }),
            sub_total: Yup.string().notRequired(''),
            discount: Yup.number().positive(lang.error_positive).notRequired(),
            vat: Yup.number().when("item_id", (val, schema) => {
                if (val[0]) {
                    return Yup.number().min(0, lang.error_positive).required(lang.error_vat)
                } else {
                    return Yup.number().min(0, lang.error_positive).notRequired()
                }
            }),
            vat_id: Yup.string().when("item_id", (val, schema) => {
                if (val[0]) {
                    return Yup.string().required(lang.error_vat)
                } else {
                    return Yup.string().notRequired()
                }
            }),
            remark: Yup.string().notRequired(lang.error_remark)
        }))
})

export const SalesOrderRoutePlanningSchema = Yup.object({
    sales: Yup.array().of(
        Yup.object().shape({
            so_id: Yup.string().required(lang.error_sales_order),
            route_id: Yup.string().required(lang.error_route),
        })).min(1, lang.error_sales_order_not_found).required(lang.error_sales_order_not_found),
})