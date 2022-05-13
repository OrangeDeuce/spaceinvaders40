import { useState } from 'react';
import "./App.css";
import MainMint from './MainMint';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';

function App() {
    const [accounts, setAccounts] = useState([]);

    return (
        <div className='App'>
            <div className='moving-background'></div>
            <Box w="100%" h="100%">
              <Header accounts={accounts} setAccounts={setAccounts} />
              <MainMint accounts={accounts} setAccounts={setAccounts} />
              <Footer accounts={accounts} setAccounts={setAccounts} />
            </Box>
          {/*</div>*/}
        </div>
    );
}

export default App;