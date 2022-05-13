import React from 'react';
import { Box, Flex, Text, Image, Stack, useMediaQuery, Link } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/provider';
import aliencollage from './assets/background/AliensCollage_transparent.png';
import logo_light from './assets/misc/spaceinvaders_logo_light.png';
import './Footer.css';
import opensea from './assets/misc/opensea_logo_trans.png';


const Footer = () => {
    //const isConnected = Boolean(accounts[0]);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");
    const [isMiddleScreen] = useMediaQuery("(min-width:768px)");

    return (
        <ChakraProvider>
            <Flex  bgGradient='linear(to-b, black, rgba(51,102,153))'>
                <Box w="100%" h={isNotSmallerScreen ? "300px" : "150px"}></Box>
            </Flex>
            <Stack bgColor="rgba(51,102,153)" direction={isNotSmallerScreen ? "row" : "column"} p="0 5%">
                
                    <Box w={isNotSmallerScreen ? "50%" : "100%" }>
                        <Image src={aliencollage} />
                    </Box>
                    <Flex color="white" fontFamily="Roboto Flex" p={isNotSmallerScreen ? "2%" : "5% 0" } w={isNotSmallerScreen ? "50%" : "100%" } height="auto">
                        <Stack justifyContent="center">
                            <Text fontFamily="vt323" spacing={-10} fontSize="4xl"  textAlign="center" align="left">The Aliens are coming!</Text>
                            <Text fontSize={isMiddleScreen ? "2em" : "1em"} align="left">
                            A collection of 4,800 unique, old-school, out-of-this world pixelated space alien profile pic NFTs that you can own and mint!  Spruce up your PFP game and add some variety with your very own randomly generated arcade alien today!  
                            </Text>
                        </Stack>
                    </Flex>
                
            </Stack>
            <Flex  bgGradient='linear(to-b, rgba(51,102,153), purple )'>
                <Box w="100%" h={isNotSmallerScreen ? "300px" : "150px"}></Box>
            </Flex>
            <Flex bgColor="purple" pl="5%">
                <Image 
                    src={logo_light}
                    p="3%" 
                    margin="auto"
                    w="30%" 
                    h="auto" 
                >    
                </Image>
                
                <Stack>
                    <Flex direction="column" p="5%" m="5%">
                        <Text fontFamily="Roboto Flex" color="white" p="2.5% 0">Visit us on OpenSea</Text>
                        <Link href='https://testnets.opensea.io/collection/spaceinvaders40' isExternal>
                            <Image 
                                src={opensea}  
                                w="20%"
                                h="auto"
                                margin="auto"
                            >
                            </Image>  
                        </Link>
                    </Flex>
                </Stack>
                
            </Flex>
            
        </ChakraProvider>
        
    );
};

export default Footer;