import { Flex,Box,Image} from "@chakra-ui/react";
import Registerform from "../../component/Registerform";
export default function Register(){
    return(
        <Flex  flexDirection="column" md={{flexDirection:"row"}} height="100vh">
                    <Box flex="6" height="100vh" md={{flex:"7"}}>
                        <Image src="/LoginBanner.png" height="100%" width="100%" objectFit="fill"/>
                    </Box>
                    <Box flex="4" md={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Registerform/>
                    </Box>
                </Flex>
    )
}