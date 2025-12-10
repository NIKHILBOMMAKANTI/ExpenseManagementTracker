import {Flex,Image,Box} from "@chakra-ui/react"

export function NoDataFound(){
    return(
        <Flex direction="column" padding="1rem" >
        <Box w="100%" h="100%">
           <Image src="/NoData.png" objectFit="fill"/>
        </Box>
        </Flex>
    )
}