import { useState } from "react";
import {ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text, Image, useMediaQuery, Stack, Container, VStack } from "@chakra-ui/react";
import spaceInvaders40 from './SpaceInvaders40.json';
import alien from "./assets/misc/alien.svg";
import alienbw from  "./assets/misc/Alien_Image_BW.png"


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
  } from '@chakra-ui/react'

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
    const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");
    

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
        <Flex justify="center" align="center" border="solid" borderColor="white" >
            <Box bgColor="rgb(29, 117, 188)"  m={isNotSmallerScreen ? "3% 30% 3%" : "3% 5% 3%"} border="solid" borderColor="pink" borderRadius="30px" w="100%">
                    <Box border="solid" borderColor="pink" align="center"  p="0 10%" mt="5%">
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
                        Bored of your NFT bag?  The future is NOW.  Liven up your profile-pic game with a newly minted space alien invader from a unique random collection of 4,800!  Mint a space alien be the envy of CT today!
                    </Text>
                
                
            
        
            {isConnected ? (
                
           
                
                <div>
                    <Box borderColor="white" margin="0 15px">Public mint is open!</Box>
                    <p>No Whitelist necessary.  Public minting is now open!</p>
                    <p>Price Per Mint: 0.0002 MATIC</p>
                    <p>Connected!</p>
                    <p>
                        {(accounts.toString()).slice(0, 5)+"..."+(accounts.toString()).slice(accounts.toString().length - 4)}
                    </p>
                    
                    <Flex align="center" justify="center">
                        <Button 
                            backgroundColor="#D6517D"
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
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number" 
                            value={mintAmount} 
                        />
                        <Button 
                            backgroundColor="#D6517D"
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
                            backgroundColor="#D6517D"    
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
                        >
                            Mint Now
                        </Button>
                </div>
            
            
            ) : (
                <Stack>
                    <Text
                        fontSize={isNotSmallerScreen ? "1.5em" : "1em"}
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="white"
                        border="solid" 
                        borderColor="pink"
                    >
                        You must be connected to Mint.
                    </Text>
                    <Container p="5% 10%">
                        <Button 
                            backgroundColor="rgb(129, 28, 128)"
                            width="65%"
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
            )}       
                
            </Box>
              
            <>
            <ChakraProvider theme={theme}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <Box>
                <ModalContent 
                    width="30%" 
                    height ="60%" 
                    backgroundColor='#D6517D' 
                    alignSelf="center" 
                    //alignItems="center" 
                    align="center"
                    justifyContent="center"
                >
                    <ModalHeader></ModalHeader>
                    
                    <ModalBody color='white' alignItems="center">
                        
                        <Text fontSize="2xl">Minted!</Text>
                        <Flex width={175} height={175} marginLeft="auto" marginRight="auto">
                            <img src={alien} alt="aliens"  />
                        </Flex>
                        
                        <Box pt="10px">
                        <a href="https://mumbai.polygonscan.com/address/0xe0704b15f60d70672f6e840e11b6ed4d481820b5" target="_blank" rel="noreferrer">
                            <Button colorScheme="purple">View your transaction</Button>
                        </a>
                        </Box>
                        <Box pt="10px">
                        <a href="https://testnets.opensea.io/collection/spaceinvaders40" target="_blank" rel="noreferrer"> 
                            <Button colorScheme='messenger'>View on OpenSea</Button>
                        </a>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
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
