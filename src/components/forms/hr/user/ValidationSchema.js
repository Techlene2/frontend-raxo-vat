import * as Yup from "yup";

export const AddUserSchema = Yup.object({

    userName: Yup.string().required("Enter Username"),
    firstName: Yup.string().required("Enter First Name"),
    lastName: Yup.string().required("Enter Last Name"),
    email: Yup.string().email().required("Enter Email"),
    imageUrl: Yup.mixed().required('Image is Required'),
    status: Yup.string().required("Select Status"),
    authorities: Yup.string().required("Select Authorities"),

})