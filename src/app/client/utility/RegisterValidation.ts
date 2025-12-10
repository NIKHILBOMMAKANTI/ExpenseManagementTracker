import { object,string,ref} from 'yup'
const passwordValidation = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/
export const RegisterValidation = object({
    firstname:string().min(4,"Firstname must be atleast 4 characters Long").required("Firstname Required"),
    lastname:string().required("Lastname Required").min(4,"Lastname must be atleast 4 characters Long"),
    email:string().email().required("Email Required"),
    password:string().min(6,"Password must be atleast 6 characters long").matches(passwordValidation,"Password Validation Failed").required("Password Required"),
    confirmpassword:string().oneOf([ref('password')],"Password Must match").required("Confirm Password Required")
})

export const LoginValidation = object({
    email:string().email().required("Email Required"),
    password:string().required("Password Required")
})