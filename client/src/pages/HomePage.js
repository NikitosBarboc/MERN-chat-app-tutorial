import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/auth/Login'
import Signin from '../components/auth/Signin'


const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
      d="flex"
      textAlign="center"
      p={3}
      bg={"white"}
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      >
        <Text fontSize='4xl' fontFamily="Work sans" color="black">
          Talk-A-Tive
        </Text>
      </Box>
      <Box 
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant='soft-rounded' >
          <TabList margin="0 0 1em 0">
              <Tab width="50%">Log In</Tab>
              <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage