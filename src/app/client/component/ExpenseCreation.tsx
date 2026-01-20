import { Stack, Text, Box } from "@chakra-ui/react"
import { ExpenseForm } from "./ExpenseForm"

export function ExpenseCreation(){
    return(
         <Stack>
                    <Stack background="#EDEDED" padding="0.4rem" lineHeight="48px">
                        <Text color="#878787">Home/Expense Mangement</Text>
                    </Stack>
                    <Stack width="95%" background="#EDEDED" borderRadius="15px" margin="auto" marginTop="1rem">
                        <Box>
                            <Text padding="1rem 1rem 0rem 1rem" color="#39619D" fontWeight="700" fontSize="20px">Add Expense</Text>
                        </Box>
                        <ExpenseForm />
                    </Stack>
                </Stack>
    )
}