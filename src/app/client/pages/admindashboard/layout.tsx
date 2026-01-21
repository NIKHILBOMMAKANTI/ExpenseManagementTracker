import { Flex, Box,Stack } from "@chakra-ui/react";
import { Header } from "../../component/layout/header";
import { AdminContent } from "../../component/AdminContent";

export default function AdminDashboard({children}:any) {

    return (
        <>
            <Header />
            <Flex flexDirection="row" justifyContent="center" minHeight="100vh">
                <Box flex="2" display={{ base: "none", sm: "block" }} background="#C3E0F8"   >
                    <AdminContent />
                </Box>
                <Box flex="8">
                    <Stack gap="4">
                        {children}
                    </Stack>
                </Box>
            </Flex>
        </>
    )
}
