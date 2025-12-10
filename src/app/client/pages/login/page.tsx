import { Flex,Box,Image} from "@chakra-ui/react";
import Loginform from "../../component/Loginform";

export default function Login(){
    return(
        <>
        <Flex flexDirection="column" md={{flexDirection:"row"}} height="100vh">
            <Box flex="6" height="100vh" md={{flex:"7"}}>
                <Image src="/LoginBanner.png" height="100%" width="100%" objectFit="fill"/>
            </Box>
            <Box flex="4" md={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                <Loginform/>
            </Box>
        </Flex>
        </>
    );
}