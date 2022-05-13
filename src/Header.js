import React from 'react'
import logo_color from './assets/misc/spaceinvaders_logo_color.png';
import { Box, Flex, HStack, Image, Text, VStack, Center, Spacer, useMediaQuery, Hide } from "@chakra-ui/react";

export default function Header() {
    const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");
  return (
    <Flex>
        <VStack width="100%">
            <Hide breakpoint='(max-width: 600px)'>
                <Flex height="20px" color="white" mt="3%"  width="100%" justifyContent="center">
                    <Text whiteSpace="nowrap" pl="3%">HI-SUPPLY: 4,800 NFTS</Text>    
                    <Spacer />
                    <Text whiteSpace="nowrap" pr="3%">.5 MATIC PER MINT</Text>
                </Flex>
            </Hide>
            <Box align="center">
                <Image 
                    src={logo_color} 
                    width="55%"
                    padding={isNotSmallerScreen ? "0 10%" : "0%"}
                    mt={isNotSmallerScreen ? "0%" : "5%"}
                    height="auto" 
                    
                />
            </Box>
        </VStack>
    </Flex>
  )
}
