import { useState } from "react";
import {ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text, Image, useMediaQuery, Stack, Container, VStack } from "@chakra-ui/react";
import spaceInvaders40 from './SpaceInvaders40.json';
import alien from "./assets/misc/alien.svg";
import alienbw from  "./assets/misc/Alien_Image_BW.png";
import confetti from "./assets/misc/icons8-confetti-48.png";

import {
    List,
    ListItem,
    ListIcon,
    UnorderedList,
  } from '@chakra-ui/react';

import {CheckCircleIcon} from '@chakra-ui/icons';


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    ChakraProvider,
    extendTheme
  } from '@chakra-ui/react';

const spaceInvaders40Address = "0xe0704b15f60D70672F6e840e11B6eD4D481820B5";

const theme = extendTheme({
    components:  {
        Modal: {
            baseStyle: (props) => ({
                dialog: {
                    maxWidth: ["60%", "65%", "70%"],
                    minWidth: "30%",
                }
            })
        }
    }

})

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);
    const [isMinting, setIsMinting] = useState(false);
    const [ isConnecting, setIsConnecting ] = useState(false);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isSmallScreen] = useMediaQuery("(min-width:400)");
    const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");
    const [isMiddleScreen] = useMediaQuery("(min-width:768px)");
    
    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                spaceInvaders40Address,
                spaceInvaders40.abi,
                signer
            );
            try {
                setIsMinting(true);
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.00002 * mintAmount).toString())
                });
                console.log('response: ', response);
                setIsMinting(false);
                onOpen();
                
            } catch (err) {
                console.log("error: ", err)    
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

    const connectAccount = async () => {
        try {
            setIsConnecting(true);
            if (!window.ethereum) return alert("Please install MetaMask.");
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts", });
            setAccounts(accounts);
          
        } catch (error) {
          console.log(error);
          throw new Error("No ethereum object");
        }
      };

    return (
        <Flex>
            {isConnected ? (
                <Flex width="100%">
                    <Flex
                        padding="10%"
                        width="100%"
                        h="auto"
                        direction={isMiddleScreen ? "row" : "column"}
                        alignItems="center"
                        
                    >
                        <Box 
                            bgColor="rgb(29, 117, 188)"  
                            borderRadius={isMiddleScreen ? "20px 0 0 20px" : "20px 20px 0 0"}
                            width={isMiddleScreen ? "60%" : "90%"}
                            height={isMiddleScreen ? "110%" : "140%"}
                            align="center"
                        >
                            <Box
                                align="center"  
                                p="0 10%" 
                                mt="5%"
                                mb="8%"
                            >
                                <Image 
                                    src={alienbw} 
                                    width={isNotSmallerScreen ? "50%" : "35%"} 
                                    height="auto">    
                                </Image>
                            </Box>
                            <Flex 
                                direction="column" 
                                p="2%" 
                                fontFamily="Roboto Flex" 
                                color="white" 
                                alignContent="center" 
                                width="80%"
                            >
                                <Box 
                                    direction="column" 
                                    fontFamily="vt323" 
                                    fontSize={isNotSmallerScreen ? "2em" : "1.5em"} 
                                    bgColor="black"
                                    mb="10%"
                                >
                                    <Text  p="2% 2% 0">You are connected!</Text>
                                    <Text  p="0 2% 2%">
                                        {(accounts.toString()).slice(0, 5)+"..."+(accounts.toString()).slice(accounts.toString().length - 4)}
                                    </Text>
                                </Box>
                            </Flex>
                    
                            <Flex align="center" justify="center">
                                <Button 
                                    backgroundColor="rgb(129, 28, 128)"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px"
                                    marginTop="10px"
                                    onClick={handleDecrement}
                                >
                                    -
                                </Button>
                                <Input 
                                    readOnly
                                    color="black"
                                    fontFamily="inherit"
                                    width="60px"
                                    height="40px"
                                    textAlign="center"
                                    marginTop="10px"
                                    type="number" 
                                    value={mintAmount} 
                                />
                                <Button 
                                    backgroundColor="rgb(129, 28, 128)"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px"
                                    marginTop="10px"
                                    onClick={handleIncrement}
                                >
                                    +
                                </Button>
                            </Flex>
                            <Button 
                                backgroundColor="rgb(129, 28, 128)"    
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleMint}
                                isLoading={isMinting}
                                loadingText="Minting"
                                mb="8%"
                            >
                                Mint Now
                            </Button>
                        </Box>

                        <Box 
                            bgColor="rgb(22, 88, 141)" 
                            color="white"
                            borderRadius={isMiddleScreen ? "0 20px 20px 0"  : "0 0 20px 20px"}
                            width={isMiddleScreen ? "40%" : "90%"}
                            height={isMiddleScreen ? "110%" : "150%"}
                            mb={isMiddleScreen ? 0 : "5%"}
                        >
                            
                            <Text
                                p="5% 10%"
                                mt={isMiddleScreen ? "10%" : "3%"}
                                fontSize={isMiddleScreen ? "3em" : "2em"}
                                fontFamily="vt323"
                                fontStyle="italic"
                                color="white"
                            >
                                Public mint is open!
                            </Text>
                            <List spacing={40} fontFamily="Roboto Flex"  mb="8%" align="left" ml="8%" fontSize={isMiddleScreen ? "1.5em" : "1.25em"}>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="white" />    Mint price = 0.5 MATIC
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="white" />   Supply: 4,800 Space Alien NFTs
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="white" />  Whitelist and Pre-Sale: Closed
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="white" />  Limited Quantities Only!
                                </ListItem>
                            
                            </List>
                        </Box>
                    </Flex>
                </Flex>

            ) : ( 
                <Flex justify="center" align="center">
                    <Box 
                        bgColor="rgb(29, 117, 188)"  
                        m={isMiddleScreen ? "5% 20% 3%" : "10% 8% 3%"}
                        borderRadius="20px" 
                        w="100%"
                    >
                        <Box 
                            align="center"  
                            p="0 10%" 
                            mt="5%"
                        >
                            <Image src={alienbw} width="25%" height="auto"></Image>
                        </Box>
                        <Text
                            p="5% 10%"
                            margin="auto"
                            fontSize={"1.2em"}
                            fontFamily="Roboto Flex"
                            fontStyle="italic"
                            color="white"
                        >
                            Test! Bored of your NFT bag?  The future is NOW.  Liven up your profile-pic game with a newly minted space alien invader from a unique random collection of 4,800!  Mint a space alien be the envy of CT today!
                        </Text>
                        <Stack>
                            <Text
                                fontSize={isNotSmallerScreen ? "1.5em" : "1em"}
                                letterSpacing="-5.5%"
                                fontFamily="VT323"
                                textShadow="0 3px #000000"
                                color="white"
                            >
                                You must be connected to Mint.
                            </Text>
                            <Container pb="10%">
                                <Button 
                                    backgroundColor="rgb(129, 28, 128)"
                                    width={isMiddleScreen ? "45%" : "50%" }
                                    height="auto"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="vt323"
                                    fontSize={isNotSmallerScreen ? "1.75em" : "1.5em"}
                                    padding="2% 5%"
                                    onClick={connectAccount}
                                    isLoading={isConnecting}
                                    loadingText="Connecting your wallet"
                                >
                                        Connect Wallet   
                                </Button>  
                            </Container>       
                        </Stack>  
                    </Box>

                </Flex>
            )}
                <>
                <ChakraProvider theme={theme}>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <Box>
                    <ModalContent 
                        width={isMiddleScreen ? "40%" : "70%"} 
                        height ={isMiddleScreen ? "95%" : isNotSmallerScreen ? "80%" : "70%"}
                        backgroundColor='#D6517D' 
                        alignSelf="center" 
                        align="center"
                        justifyContent="center"
                        borderWidth="med"
                        borderRadius="20px"
                    >
                    <ModalHeader></ModalHeader>
                        
                    <ModalBody 
                        color='white' 
                        alignItems="center" 
                        mt="10%" >
                        <Flex 
                            justify="center" 
                            mt="5%"
                        >
                            <Text fontSize={isMiddleScreen ? "5xl" : "3xl"} fontFamily="vt323">Minted!</Text>
                            <Image src={confetti} />
                        </Flex>
                        <Flex 
                            width={isMiddleScreen ? "60%" : "50%" } 
                            height="auto" 
                            margin="auto" 
                            pt="6%" 
                            pb="6%"
                        >
                            <img src={alien} alt="aliens" border="solid pink"  />
                        </Flex>
                        <Box 
                            p="10 15% 0"
                            width="100%" 
                        >
                            <a 
                                href="https://mumbai.polygonscan.com/address/0xe0704b15f60d70672f6e840e11b6ed4d481820b5" 
                                target="_blank" 
                                rel="noreferrer"
                            >
                                <Button colorScheme="purple" width="100%">View your transaction</Button>
                            </a>
                        </Box>
                        <Box pt="10px">
                            <a 
                                href="https://testnets.opensea.io/collection/spaceinvaders40" 
                                target="_blank" 
                                rel="noreferrer"
                            > 
                                <Button colorScheme='messenger' width="100%">View on OpenSea</Button>
                            </a>
                        </Box>
                    </ModalBody>

                        <ModalFooter
                            mb="10%" 
                            height="100%">
                            <a href="/">
                                <Button colorScheme="blackAlpha" onClick={onClose}>Close</Button>
                            </a>
                        </ModalFooter>
                        <ModalCloseButton />
                    </ModalContent>
                    </Box>
                </Modal>
                </ChakraProvider>
                </>
        </Flex>    
    );   
};

export default MainMint;
