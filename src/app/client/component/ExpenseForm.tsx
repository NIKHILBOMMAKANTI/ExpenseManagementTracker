import { Button, Card, Field, Input, Stack, NativeSelect, Textarea, Box, Icon, FileUpload, Image } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu"
import axios from "axios";
import { useRef,useContext,useState } from "react";
import { title } from "process";
import toast, { Toaster } from 'react-hot-toast';
import { PageContext } from "../context/PageProvider";
import { useRouter } from "next/navigation";

interface ExpenseFormDataProp {
    title?: HTMLInputElement | null,
    description?: HTMLTextAreaElement | null,
    category?: HTMLSelectElement | null,
    amount?: HTMLInputElement | null,
    receipt?: HTMLInputElement | null
}
export function ExpenseForm() {
    const ExpenseFormData = useRef<ExpenseFormDataProp>({});
        const { page, setPage } = useContext(PageContext)!;
        const [isSubmitting, setIsSubmitting] = useState(false);
        const route = useRouter();
    
    const handleCreateExpense = async () => {
        try {

            const exppayload = new FormData();
            exppayload.append("title", ExpenseFormData.current.title?.value || '')
            exppayload.append("description", ExpenseFormData.current.description?.value || '')
            exppayload.append("category", ExpenseFormData.current.category?.value || '')
            exppayload.append("amount", ExpenseFormData.current.amount?.value || '')
            exppayload.append("receipt", ExpenseFormData.current.receipt?.files?.[0] || '')

            const validateurl = "/api/policy/validatepolicy";
            const ValidateResponse = await axios.post(validateurl,{
                name: ExpenseFormData.current.title?.value,
                description: ExpenseFormData.current.description?.value,
                category: ExpenseFormData.current.category?.value,
                limitAmount: ExpenseFormData.current.amount?.value,
            });
            const token = localStorage.getItem("Token");
            const url = `/api/expense`;
            const response = await axios.post(url, exppayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            let ResponseStatus = response?.data?.status
            if (ResponseStatus == 200) {
                if (ExpenseFormData.current?.title?.value || ExpenseFormData.current?.description?.value || ExpenseFormData.current?.category?.value || ExpenseFormData.current?.amount?.value || ExpenseFormData.current?.receipt?.files?.length) {
                    ExpenseFormData.current.title!.value = "";
                    ExpenseFormData.current.description!.value = "";
                    ExpenseFormData.current.category!.value = "";
                    ExpenseFormData.current.amount!.value = "";
                    ExpenseFormData.current.receipt!.value = "";
                }

                await toast.success(`${response?.data?.message}`, {
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
                setTimeout(()=>{setPage('expense'),route.push('/client/pages/admindashboard/expense')},2100)

                
            }

        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.message || "Something Went Wrong"
            toast.error(errorMessage, {
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
            <form>
                <Card.Root border="none" color="#39619F" width="100%" background="#EDEDED" >
                    <Card.Body paddingTop="0.5rem">
                        <Stack direction={{ base: "column", md: "row" }} gap="6" w="full">
                            <Box flex="2">
                                <Stack gap="4" w="full" direction="row">
                                    <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} >
                                        <Field.Root >
                                            <Field.Label fontSize="15px">Title</Field.Label>
                                            <Input border="1px solid #86A4C3" name="title" placeholder="Enter Your Title" ref={(el) => { ExpenseFormData.current.title = el }} />
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label fontSize="15px">Category</Field.Label>
                                            <NativeSelect.Root border="1px solid #86A4C3" borderRadius="5px">
                                                <NativeSelect.Field ref={(el) => { ExpenseFormData.current.category = el }}>
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
                                <Stack gap="4" width="full" flexDirection={{ base: 'column', md: 'row' }} paddingTop="1rem">
                                    <Field.Root >
                                        <Field.Label fontSize="15px">Amount</Field.Label>
                                        <Input border="1px solid #86A4C3" name="title" placeholder="Enter Your Firstname" ref={(el) => { ExpenseFormData.current.amount = el }} />
                                    </Field.Root>
                                    <Field.Root >
                                        <Field.Label fontSize="15px">Description</Field.Label>
                                        <Textarea rows={1} border="1px solid #86A4C3" name="firstname" placeholder="Enter Your Description" ref={(el) => { ExpenseFormData.current.description = el }} />
                                    </Field.Root>
                                </Stack>

                            </Box>
                            <Box flex="1" backgroundColor="#EDEDED">
                                <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10} >
                                    <FileUpload.HiddenInput ref={(el) => { ExpenseFormData.current.receipt = el }} />
                                    <FileUpload.Trigger>
                                    <FileUpload.Dropzone bg="#EDEDED" border="2px dashed  #CBCBCB" style={{ height: "150px", minHeight: "0" }}>
                                        <Icon size="md" color="fg.muted">
                                            <Image src="/FileUpload.png" width="58px" height="58px" />
                                        </Icon>
                                        <FileUpload.DropzoneContent >
                                            <Box>Drag and drop files here</Box>
                                            <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                                        </FileUpload.DropzoneContent>
                                    </FileUpload.Dropzone>
                                    </FileUpload.Trigger>
                                    <Box style={{ background: "#EDEDED" }}>
                                        <FileUpload.List />
                                    </Box>
                                </FileUpload.Root>
                            </Box>
                        </Stack>

                        <Stack justifyContent="center" alignItems="center" paddingTop="1rem">
                            <Button loading={isSubmitting} loadingText="Creating Expense..." background="#37629F" width={{ base: "100%", md: "20%" }} borderRadius="5px"  onClick={() => { setIsSubmitting(true); handleCreateExpense(); }}>Create Expense</Button>
                        </Stack>
                    </Card.Body>
                </Card.Root>

            </form>
            <Toaster position="top-right"/>
        </>
    );
}