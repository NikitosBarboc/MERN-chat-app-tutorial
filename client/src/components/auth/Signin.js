import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const Signin = () => {
  const [formValues, setFormValues] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  function onChange(e) {
    console.log(showPassword);
    setFormValues((prevValues) => ({
      ...prevValues, [e.target.name]: e.target.value
    }))
  }
  
  function togglePassword(e) {
    setShowPassword(!showPassword);
  }

  function toggleConfirmPassword(e) {
      setShowConfirmedPassword(!showConfirmedPassword);
  }

  function postDetails(pics) {

  }

  function submitHandler() {
    
  }
  return (
    <VStack spacing='5px' color="black" >
      <FormControl id="first-name" isRequired>
        <FormLabel>
          Name
        </FormLabel>
        <Input 
          name='name'
          value={formValues.name}
          placeholder='Enter your email'
          onChange={onChange}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>
          Email
        </FormLabel>
        <Input 
          name='email'
          type="email"
          value={formValues.email}
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
      <FormControl id="password" isRequired>
        <FormLabel>
          Confirm Password
        </FormLabel>
        <InputGroup>
          <Input 
            name='confirmPassword'
            type={ showConfirmedPassword ? "text" : "password" }
            value={formValues.confirmPassword}
            placeholder='Confirm your password'
            onChange={onChange}
          />
          <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={toggleConfirmPassword}>
            {showConfirmedPassword ? "hide" : "show"}
          </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" isRequired>
        <FormLabel>
          Upload Your Picture
        </FormLabel>
        <Input 
          name='pic'
          type="file"
          p={1.5}
          accept="image/*"
          value={formValues.pic}
          placeholder='Enter your name'
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signin