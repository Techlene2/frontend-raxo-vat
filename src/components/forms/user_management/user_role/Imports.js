import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import SingleSelect from '../../../input_fields/SingleSelect'
import { AddUserRoleSchema } from './ValidationSchema'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userListTodo } from '../../../../redux/slices/hr/user/UserList.js'
import { roleListTodo } from '../../../../redux/slices/user_management/role/RoleList.js'
import { addUserRoleTodo } from '../../../../redux/slices/user_management/user_role/AddUserRole.js'
import { updateUserRoleTodo } from '../../../../redux/slices/user_management/user_role/UpdateUserRole.js'
import { userRoleDetailsTodo } from '../../../../redux/slices/user_management/user_role/UserRoleDetails.js'
import Loader from '../../../loader/Loader'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/UserRole.js').default
} else {
    lang = require('../../../../lang/en/UserRole.js').default
}

export const UserRoleImports = {
    Form,
    useFormik,
    SaveButton,
    SingleSelect,
    AddUserRoleSchema,
    ToastContainer,
    toast,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    userListTodo,
    roleListTodo,
    addUserRoleTodo,
    updateUserRoleTodo,
    userRoleDetailsTodo,
    Loader,
    lang
}