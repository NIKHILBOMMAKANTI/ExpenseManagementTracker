import { Button, Card, Field, Input, Stack, NativeSelect, Textarea } from "@chakra-ui/react";
import { useRef } from "react";
import Swal from "sweetalert2";
import { useContext,useState } from "react";
import { PageContext } from "../context/PageProvider";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormType {
    name?: HTMLInputElement | null,
    description?: HTMLTextAreaElement | null,
    limitAmount?: HTMLInputElement | null,
    effectiveDate?: HTMLInputElement | null,
    expiryDate?: HTMLInputElement | null,
    category?: HTMLSelectElement | null
}
export function PolicyForm() {
    const {page, setPage} = useContext(PageContext)!;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const route = useRouter();

    const FormData = useRef<FormType>({});
    const handleSubmit = async(e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsSubmitting(true);
            const policyPayload = {
                name: FormData.current.name?.value,
                description: FormData.current.description?.value,
                limitAmount: FormData.current.limitAmount?.value,
                effectiveDate: FormData.current.effectiveDate?.value,
                expiryDate: FormData.current.expiryDate?.value,
                category: FormData.current.category?.value
            }
            const Token = localStorage.getItem("Token");
            if (Token) {
                
                    const url = '/api/policy';
                    const response = await axios.post(url, policyPayload, {
                        headers: {
                            Authorization: `Bearer ${Token}`
                        }
                    })
                    const PolicyPayload = response?.data
                    await toast.success(`${PolicyPayload?.message}`, {
                    style: {
                        border: '1px solid #38A169',
                        padding: '16px',
                        color: '#38A169',
                    },
                    iconTheme: {
                        primary: '#38A169',
                        secondary: '#FFFAEE',
                    },
                });
                setTimeout(()=>{ setPage('policy'); route.push('/client/pages/admindashboard/policy')},2000)
            }

        }catch (error: any) {
        const Error = error.response?.data 
        toast.error(`${Error.message}`, {
                    style: {
                        border: '1px solid #E53E3E',
                        padding: '16px',
                        color: '#E53E3E',
                    },
                    iconTheme: {
                        primary: '#E53E3E',
                        secondary: '#FFFAEE',
                    },
                });
    }finally{
            setIsSubmitting(false);
        }
}
return (
    <>
    <form onSubmit={(e) => { handleSubmit(e) }}>
        <Card.Root border="none" color="#39619F" width="100%" background="#EDEDED" >
            <Card.Body paddingTop="0.5rem">
                <Stack gap="4" w="full" direction="row">
                    <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} >
                        <Field.Root >
                            <Field.Label fontSize="15px">Policy Name</Field.Label>
                            <Input border="1px solid #86A4C3" name="policyname" placeholder="Enter Policy Name" ref={(el) => { FormData.current.name = el }} />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label fontSize="15px">Category</Field.Label>
                            <NativeSelect.Root border="1px solid #86A4C3" borderRadius="5px">
                                <NativeSelect.Field ref={(el) => { FormData.current.category = el }}>
                                    <option value="Staff Expenses">Staff Expenses</option>
                                    <option value="Operational Expenses">Operational Expenses</option>
                                    <option value="Administrative Expenses">Administrative Expenses</option>
                                    <option value="Travel Expenses">Travel Expenses</option>
                                    <option value="Project Expenses">Project Expenses</option>
                                    <option value="Miscellaneous Expenses">Miscellaneous Expenses</option>
                                </NativeSelect.Field>
                                <NativeSelect.Indicator />
                            </NativeSelect.Root>
                        </Field.Root>
                    </Stack>
                </Stack>
                <Stack gap="4" w="full" direction="row" paddingTop="1rem">
                    <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} >
                        <Field.Root >
                            <Field.Label fontSize="15px">Effective Date</Field.Label>
                            <Input type="date" border="1px solid #86A4C3" name="effectiveDate" ref={(el) => { FormData.current.effectiveDate = el }} />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label fontSize="15px">Expiry Date</Field.Label>
                            <Input type="date" border="1px solid #86A4C3" name="expiryDate" variant="outline" placeholder="Enter Effective Date" ref={(el) => { FormData.current.expiryDate = el }} />
                        </Field.Root>
                    </Stack>
                </Stack>
                <Stack gap="4" w="full" direction="row" paddingTop="1rem">
                    <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} >
                        <Field.Root >
                            <Field.Label fontSize="15px">Description</Field.Label>
                            <Textarea rows={1} border="1px solid #86A4C3" name="description" ref={(el) => { FormData.current.description = el }} />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label fontSize="15px">Limit Amount</Field.Label>
                            <Input border="1px solid #86A4C3" name="limitAmount" variant="outline" placeholder="Enter Limit Amount" ref={(el) => { FormData.current.limitAmount = el }} />
                        </Field.Root>
                    </Stack>
                </Stack>
                <Stack justifyContent="center" alignItems="center" paddingTop="1rem">
                    <Button type="submit" background="#37629F" width={{ base: "100%", md: "20%" }} borderRadius="5px" loading={isSubmitting} loadingText="Creating Policy...">Create Policy</Button>
                </Stack>
            </Card.Body>
        </Card.Root>
    </form>
    <Toaster position="top-right"/>
    </>
)
}