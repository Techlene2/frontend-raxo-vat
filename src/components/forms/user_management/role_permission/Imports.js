import { Form, Card } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'
import SingleSelect from '../../../input_fields/SingleSelect'
import Checkbox from '../../../input_fields/Checkbox'
import { permissionMenuListTodo } from '../../../../redux/slices/user_management/permission_menu/PermissionMenuList.js'
import { RolePermissionSchema } from './ValidationSchema'
import { roleListTodo } from '../../../../redux/slices/user_management/role/RoleList.js'
import { rolePermissionByRoleTodo } from '../../../../redux/slices/user_management/role_permission/RolePermissionByRole.js'
import { addRolePermissionTodo } from '../../../../redux/slices/user_management/role_permission/AddRolePermission.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/RolePermission.js').default
} else {
    lang = require('../../../../lang/en/RolePermission.js').default
}


export const RolePermissionImport = {
    Form,
    Card,
    useFormik,
    SaveButton,
    useDispatch,
    useSelector,
    useNavigate,
    toast,
    ToastContainer,
    Loader,
    SingleSelect,
    Checkbox,
    permissionMenuListTodo,
    RolePermissionSchema,
    roleListTodo,
    rolePermissionByRoleTodo,
    addRolePermissionTodo,
    lang
}