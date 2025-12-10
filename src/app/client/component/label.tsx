import { HStack, Box, Text } from "@chakra-ui/react";
export function Label({payload}:any){
    return(
        <HStack  wrap="wrap" justify="center">
      {payload.map((ExpenseItem:any,index:number) => (
        <HStack key={index}>
          <Box w="12px" h="12px" bg={ExpenseItem.color} />
          <Text fontSize="sm">{ExpenseItem.category}: {ExpenseItem.amount}</Text>
        </HStack>
      ))}
    </HStack>
    )
}