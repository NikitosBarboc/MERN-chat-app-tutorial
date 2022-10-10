import React, { useState } from 'react'
import { useToast, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Toast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [formValues, setFormValues] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  let navigate = useNavigate();

  function onChange(e) {
    setFormValues((prevValues) => ({
      ...prevValues, [e.target.name]: e.target.value
    }));
  }
  
  function togglePassword(e) {
    setShowPassword(!showPassword);
  }

  async function submitHandler() {
    
    setLoading(true);
    const {email, password} = formValues;
    if (!email || !password) {
      toast({
        title: "Please Fill all the Field",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      setLoading(false);
    }
    try {
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        {
          "Content-type": "application/json",
        }
      );
      if (data.response)
      console.log(data)
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
      
    } catch(error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
      });
      setLoading(false);
    }
  }
  return (
    <VStack spacing='5px' color="black" >
      <FormControl id="email" isRequired>
        <FormLabel>
          Email
        </FormLabel>
        <Input 
          name='email'
          type="text"
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
        isLoading={loading}
        onClick={() => {
          setFormValues((prevValues) => ({
            ...prevValues, email: "guest@example.com",
            password: "123456"
          }))
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login;
