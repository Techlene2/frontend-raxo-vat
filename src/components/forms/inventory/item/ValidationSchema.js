import * as Yup from "yup";

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Item.js').default
} else {
    lang = require('../../../../lang/en/Item.js').default
}

export const ItemSchema = Yup.object().shape({

    category: Yup.string().required(lang.error_category),
    sub_category: Yup.string().required(lang.error_sub_category),
    brand: Yup.string().required(lang.error_brand),
    cost_center: Yup.string().required(lang.error_cost_center),
    sold: Yup.bool(),
    purchased: Yup.bool(),
    return: Yup.bool(),

    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_description),
    item_code: Yup.string().required(lang.error_item_code),
    item_image: Yup.mixed().notRequired(lang.error_item_image),
    group: Yup.string().required(lang.error_group),
    primary_unit: Yup.string().required(lang.error_primary_unit),
    barcode: Yup.string().required(lang.error_barcode),
    status: Yup.string().required(lang.error_status),

    tax: Yup.string().required(lang.error_tax),
    secondary_unit: Yup.string().required(lang.error_secondary_unit),
    color: Yup.string().required(lang.error_color),
    weight: Yup.string().required(lang.error_weight),
    conversion: Yup.string().required(lang.error_conversion),
    segment: Yup.string().required(lang.error_segment),
    rack: Yup.string().required(lang.error_rack),
    sourceApp: Yup.string().notRequired(lang.error_source_app),

}).test('at-least-one', null, (values) => {
    const { sold, purchased, return: returnValue } = values;
    if (!(sold || purchased || returnValue)) {
        return new Yup.ValidationError(lang.error_checkbox, null, 'sold');
    }
    return true;
});

export const AddItemModal = Yup.object({

    name: Yup.string().required(lang.error_name),

});