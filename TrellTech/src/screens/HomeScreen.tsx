import { Box,Text, VStack,Heading,FlatList,HStack}  from "@gluestack-ui/themed"
import React from "react"
import { View } from "react-native"

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>

    <Box h="100%" bg="red">

      
          
          <Box w="100%" bg="white" pl="$4" mt={16}>
            <Text color="balck" fontWeight="bold">VOS ESPACES DE TRAVAIL</Text>
          </Box>


 <Box >
    <Heading size="xl" pl="$4" pb="$3" bg="pink">Name of space </Heading>

  {/* <FlatList
        data={data}
         renderItem={({ item }) => (
          <Box
            borderBottomWidth="$1"
            borderColor="$trueGray800"
            $dark-borderColor="$trueGray100"
            $base-pl={0}
            $base-pr={0}
            $sm-pl="$4"
            $sm-pr="$5"
            py="$2"
          >
            <HStack space="md" justifyContent="space-between">
              <VStack>
                <Text
                  color="$coolGray800"
                  fontWeight="$bold"
                  $dark-color="$warmGray100"
                >
                  {item.fullName}
                </Text>
                <Text
                  color="$coolGray600"
                  $dark-color="$warmGray200"
                >
                  {item.recentText}
                </Text>
              </VStack>
              <Text
                fontSize="$xs"
                color="$coolGray800"
                alignSelf="flex-start"
                $dark-color="$warmGray100"
              >
                {item.timeStamp}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      /> */}
    </Box>




       
   
    </Box>
  </View>
  
  )
}