'use client'
import { Button, Card, Field, Input, Stack, Image, Text, Center, HStack } from "@chakra-ui/react"
import Link from "next/link";
import { useFormik } from 'formik'
import { RegisterValidation } from "../utility/RegisterValidation";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from 'sweetalert2'

function Registerform() {
    const route = useRouter();
    const handleFormSubmission = () => {
        const payload = {
            firstname: values?.firstname,
            lastname: values?.lastname,
            email: values?.email,
            password: values?.password,
        }
        const PostData = async () => {
            try {
                const url = "/api/auth/Register";
                const response = await axios.post(url, payload)
                const responsepayload = response.data.Registereduser
                if (responsepayload.status == 200) {
                    Swal.fire({
                        title: `${responsepayload.message}`,
                        icon: "success",
                        confirmButtonColor: "#39619F"

                    }).then((result) => {
                        if (result.isConfirmed) {
                            route.push("/client/pages/login")
                        }
                    });
                }
            } catch (error: unknown) {
                const message = (error instanceof Error) ? (error?.message) : ("Something Went Wrong")
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: `${message}`,
                    confirmButtonColor: "#F52F07"
                })
            }
        }
        PostData()
    }
    const { values, handleChange, errors, handleSubmit, touched } = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpassword: ""
        },
        onSubmit: handleFormSubmission,
        validationSchema: RegisterValidation
    })
    return (
        <form onSubmit={handleSubmit}>
            <Card.Root maxW="sm" border="none" color="#39619F" width="100%" >
                <Card.Header alignItems="center">
                    <Image width="171px" height="39px" src="/Logo.png" />
                </Card.Header>
                <Card.Body>
                    <Stack gap="4" w="full">
                        <HStack gap="4" width="full">
                            <Field.Root invalid>
                                <Field.Label>First Name</Field.Label>
                                <Input border="1px solid #86A4C3" name="firstname" placeholder="Enter Your Firstname" value={values.firstname} onChange={handleChange} />
                                {(errors.firstname && touched.firstname) && <Field.ErrorText>{errors?.firstname}</Field.ErrorText>}
                            </Field.Root>
                            <Field.Root invalid>
                                <Field.Label>Last Name</Field.Label>
                                <Input border="1px solid #86A4C3" name="lastname" placeholder="Enter Your Lastname" onChange={handleChange} value={values.lastname} />
                                {(errors.lastname && touched.lastname) && <Field.ErrorText>{errors?.lastname}</Field.ErrorText>}
                            </Field.Root>
                        </HStack>
                        <Field.Root invalid>
                            <Field.Label>Email</Field.Label>
                            <Input border="1px solid #86A4C3" name="email" placeholder="Enter Your Email" onChange={handleChange} value={values.email} />
                            {(errors.email && touched.email) && <Field.ErrorText>{errors?.email}</Field.ErrorText>}
                        </Field.Root>
                        <HStack gap="4" width="full">
                            <Field.Root invalid>
                                <Field.Label>Password</Field.Label>
                                <Input type="password" border="1px solid #86A4C3" name="password" placeholder="Enter Your Password" onChange={handleChange} value={values.password} />
                                {(errors.password && touched.password) && <Field.ErrorText>{errors?.password}</Field.ErrorText>}
                            </Field.Root>
                            <Field.Root invalid>
                                <Field.Label>Confirm Password</Field.Label>
                                <Input type="password" border="1px solid #86A4C3" name="confirmpassword" placeholder="Confirm Your Password" onChange={handleChange} value={values.confirmpassword} />
                                {(errors.confirmpassword && touched.confirmpassword) && <Field.ErrorText>{errors?.confirmpassword}</Field.ErrorText>}
                            </Field.Root>
                        </HStack>
                    </Stack>
                </Card.Body>
                <Card.Footer >
                    <Button type="submit" variant="solid" width="100%" background="#39619F" fontWeight="700">Register</Button>
                </Card.Footer>
                <Center>
                    <Card.Description alignItems="center">
                        Already have an account?
                        <Link href="/client/pages/login">
                            <Text as="span" paddingLeft="6px" color="#39619F" fontWeight="700">
                                Login
                            </Text>
                        </Link>
                    </Card.Description>
                </Center>
            </Card.Root>
        </form>
    )
}
export default Registerform