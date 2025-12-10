import { object,string,ref} from 'yup'

export const LoginValidation = object({
    email:string().email().required("Email Required"),
    password:string().required("Password Required")
})