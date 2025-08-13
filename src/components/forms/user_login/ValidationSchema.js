import * as Yup from "yup";

export const LoginSchema = Yup.object({

    user: Yup.string().required("Enter Your User Name"),
    password: Yup.string().required("Enter Your Password"),
});

export const ForgetPasswordSchema = Yup.object({

    user: Yup.string().required("Enter Your User Name"),
});