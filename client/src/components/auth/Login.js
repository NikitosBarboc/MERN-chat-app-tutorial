import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'


const Login = () => {
  const [formValues, setFormValues] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function onChange(e) {
    console.log(showPassword);
    setFormValues((prevValues) => ({
      ...prevValues, [e.target.name]: e.target.value
    }))
  }
  
  function togglePassword(e) {
    setShowPassword(!showPassword);
  }

  function submitHandler() {
    
  }
  return (
    <VStack spacing='5px' color="black" >
      <FormControl id="email" isRequired>
        <FormLabel>
          Email Or Name
        </FormLabel>
        <Input 
          name='emailOrEmail'
          type="text"
          value={formValues.emailOrEmail}
          placeholder='Enter your name'
          onChange={onChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>
          Password
        </FormLabel>
        <InputGroup>
          <Input 
            name='password'
            type={showPassword ? "text" : "password" }
            value={formValues.password}
            placeholder='Enter your password'
            onChange={onChange}
          />
          <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={togglePassword}>
            {showPassword ? "hide" : "show"}
          </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login Up
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setFormValues((prevValues) => ({
            ...prevValues, email: "guest@example.com",
            password: "123456"
          }))
        }}
      >
        Login Up
      </Button>
    </VStack>
  )
}

export default Login;
