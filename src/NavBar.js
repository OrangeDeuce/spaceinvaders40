import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Facebook from "./assets/social-media-icons/facebook_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Email from "./assets/social-media-icons/email_32x32.png";

const NavBar = ({ accounts, setAccounts }) => {
    //const isConnected = Boolean(accounts[0]);

   

    return (
        <Flex justify="space-between" align="center" padding="30px" borderColor="pink" border="solid">
            {/* Left Side - Social Media Icons */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href='https://www.facebook.com'>
                    <Image src={Facebook} boxSize="42px" margin="0 15px" alt='facebook'></Image>
                </Link>
                <Link href='https://www.twitter.com'>
                    <Image src={Twitter} boxSize="42px" margin="0 15px"></Image>
                </Link>
                <Link href='https://www.gmail.com'>
                    <Image src={Email} boxSize="42px" margin="0 15px"></Image>
                </Link>
              
            </Flex>
            {/* Right Side - Sections and Connect */}
            <Flex justify="space-around" width="40%" padding="30px 30px 30px 30px">
                <Box margin="0 15px">
                    <Link href='#'>
                        About
                    </Link>
                </Box>
                <Spacer />
                <Box margin="0 15px">Mint</Box>
                <Spacer />
                <Box margin="0 15px">Team</Box>
                <Spacer />
            </Flex>
        </Flex>
    );
};

export default NavBar;