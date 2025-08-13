import * as Yup from "yup"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/PricingMaster.js').default
} else {
    lang = require('../../../../lang/en/PricingMaster.js').default
}

export const ProductPricingSchema = Yup.object({

    sub_cat: Yup.string().notRequired(lang.error_sub_cat),
    brand: Yup.string().notRequired(lang.error_brand),
    effective_date: Yup.string().required(lang.error_date),
    effective_from: Yup.string().required(lang.error_date),

    product_price: Yup.array().of(
        Yup.object().shape({
            new_rate: Yup.number().min(0, lang.error_positive_no).required(lang.error_rate),
            remark: Yup.string().notRequired(''),
        }))
        .min(1, lang.error_item_nf).required(lang.error_item_nf)
});