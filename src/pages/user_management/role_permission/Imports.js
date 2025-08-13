import AssignRolePermissionForm from '../../../components/forms/user_management/role_permission/AssignRolePermissionForm.jsx'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/RolePermission.js').default
} else {
    lang = require('../../../lang/en/RolePermission.js').default
}

export const RolePermissionImport = {
    AssignRolePermissionForm,
    lang
}