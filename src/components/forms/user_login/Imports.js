import { Form, InputGroup } from 'react-bootstrap'
import SaveButton from '../../buttons/SaveButton'
import { useFormik } from 'formik'
import { LoginSchema } from './ValidationSchema'
import { ForgetPasswordSchema } from './ValidationSchema'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SignInTodo } from '../../../redux/slices/assets/SignIn'
import { toast } from 'react-toastify'
import { sidebarTodo } from '../../../redux/slices/assets/Sidebar'
import { LuKeyRound, LuUser2 } from 'react-icons/lu'

export const LoginFormImport = {
    Form,
    InputGroup,
    SaveButton,
    useFormik,
    LoginSchema,
    ForgetPasswordSchema,
    useNavigate,
    useDispatch,
    SignInTodo,
    toast,
    sidebarTodo,
    LuKeyRound,
    LuUser2
}