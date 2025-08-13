import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import Text from '../../../input_fields/Text'
import Email from '../../../input_fields/Email'
import File from '../../../input_fields/File'
import SelectStatus from '../../../input_fields/SelectStatus'
import SingleSelect from '../../../input_fields/SingleSelect'
import { AddUserSchema } from './ValidationSchema'

export const UserImports = {
    Form,
    useFormik,
    SaveButton,
    Text,
    Email,
    File,
    SelectStatus,
    SingleSelect,
    AddUserSchema,
}