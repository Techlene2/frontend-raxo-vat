import * as Yup from 'yup';

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Group.js').default
} else {
    lang = require('../../../../lang/en/Group.js').default
}


export const GroupSchema = Yup.object({

    name: Yup.string().required(lang.error_name),
    description: Yup.string().required(lang.error_desc),
    status: Yup.string().required(lang.error_status),
    source: Yup.string().required(lang.error_source),
    grouptype: Yup.string().required(lang.error_grouptype),

});