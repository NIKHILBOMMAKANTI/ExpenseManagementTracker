import { Stack, Text, Box } from "@chakra-ui/react"
import { UserForm } from "./UserForm"
export function UserCreation() {
    return (

        <Stack>
            <Stack background="#EDEDED" padding="0.4rem">
                <Text color="#878787">Home/User Mangement</Text>
            </Stack>
            <Stack width="95%" background="#EDEDED" borderRadius="15px" margin="auto" marginTop="1rem">
                <Box>
                    <Text padding="1rem 1rem 0rem 1rem" color="#39619D" fontWeight="700" fontSize="20px">Add User</Text>
                </Box>
                <UserForm />
            </Stack>
        </Stack>

    )
}