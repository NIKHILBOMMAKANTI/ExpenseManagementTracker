"use client"
import { Button, Card, Field, Input, Stack, Checkbox, Image, Text, Center } from "@chakra-ui/react"
import { LoginValidation } from "../utility/LoginValidation"
import Link from "next/link"
import { useFormik } from "formik"
import axios from "axios"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
function Loginform() {
    const router = useRouter();
    const handleLoginForm = ()=>{
            const payload = {
            email:values?.email,
            password:values?.password
        }
        const PostData = async ()=>{
            try{
            const url = "/api/auth/Login";
            const response = await axios.post(url,payload);
            const responsepayload = response.data;
            if(responsepayload?.status == 200 ){
                Swal.fire({
                    title:`${responsepayload?.message}`,
                    icon: "success",
                    confirmButtonColor:"#39619F"
                }).then((result)=>{
                    if(result.isConfirmed && responsepayload.role == 'Admin'){
                        localStorage.setItem("Token",responsepayload.Token)
                        router.push("/client/pages/admindashboard")
                    }
                })
            }
         }catch(error:unknown){
            const message = (error instanceof Error)?(error?.message):("Something Went Wrong")
            Swal.fire({
                icon:"error",
                title:"Registration Failed",
                text:`${message}`,
                confirmButtonColor:"#F52F07"
            })
        }
        }
        PostData();
       
    }
    const { values, handleChange, errors, handleSubmit, touched } = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit:handleLoginForm,
        validationSchema:LoginValidation
    })
    return (
        <form onSubmit={handleSubmit}  style={{"width":"100%"}}>
        <Card.Root  border="none" color="#39619F"  >
            <Card.Header alignItems="center">
                <Image width="171px" height="39px" src="/Logo.png" />
            </Card.Header>
            <Card.Body md={{"padding":"2rem"}}>
                <Stack gap="4" >
                    <Field.Root invalid>
                        <Field.Label>Email</Field.Label>
                        <Input border="1px solid #86A4C3" name="email" value={values?.email} onChange={handleChange}/>
                        {(errors.email && touched.email) && <Field.ErrorText>{errors?.email}</Field.ErrorText>}

                    </Field.Root>
                    <Field.Root invalid>
                        <Field.Label>Password</Field.Label>
                        <Input border="1px solid #86A4C3" type="password" name="password" value={values?.password} onChange={handleChange}/>
                        {(errors.password && touched.password) && <Field.ErrorText>{errors?.password}</Field.ErrorText>}

                    </Field.Root>
                </Stack>
                <Checkbox.Root marginTop="1rem" >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control color="#39619F" background="#ffffff"/>
                    <Checkbox.Label>Remember Me</Checkbox.Label>
                </Checkbox.Root>
            </Card.Body>
            <Card.Footer >
                <Button type="submit" variant="solid" width="100%" background="#39619F" fontWeight="700">Login</Button>
            </Card.Footer>
            <Center>
                <Card.Description alignItems="center">
                    Don't have an account?
                    <Link href="/client/pages/register">
                    <Text as="span" paddingLeft="6px" color="#39619F" fontWeight="700">
                        Register
                    </Text>
                    </Link>
                </Card.Description>
            </Center>
        </Card.Root>
        </form>
    )
}

export default Loginform