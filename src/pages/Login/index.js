import React, { useState, useContext }  from 'react';
import { ActivityIndicator, Text } from 'react-native';

import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText } from './style';

import { AuthContext } from "../../contexts/auth";

function Login(){

  const [ login, setLogin ] = useState(true);
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const { signUp, signIn, loadingAuth } = useContext(AuthContext);

  function toggleLogin(){
    setLogin(!login)
    setEmail('');
    setPassword('');
    setName('');
  }

  async function handleSignIn(){

    if(email === '' || password === ''){
      console.log("Preencha todos os campos")
      return;
    }

    //Acessando o login do usuário

    await signIn(email, password)
  }

  function handleSignUp(){

    if(name === '' || email === '' || password === ''){
      console.log('Preencha todos os campos');
      return;
    }

    //Cadastrar o usuário

    signUp(email, password, name)
  }

  if(login){
    return(
      <Container>
        <Title>
          Dev<Text style={{ color: '#E52246'}}>Post</Text>
        </Title>
  
        <Input
          placeholder="seuemail@teste.com"
          value={email}
          onChangeText={text => setEmail(text)}
        />
  
        <Input
          placeholder="******"
          value={password}
          onChangeText={text => setPassword(text)}
        />
  
        <Button onPress={handleSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff"/>
          ): (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>
  
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
       
      </Container>
    )
  }

  return(
    <Container>
      <Title>
        Dev<Text style={{ color: '#E52246'}}>Post</Text>
      </Title>

      <Input
        placeholder="Seu nome"
        value={name}
        onChangeText={text => setName(text)}
      />

      <Input
        placeholder="seuemail@teste.com"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <Input
        placeholder="******"
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff"/>
          ): (
            <ButtonText>Cadastrar</ButtonText>
          )}
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tenho uma conta</SignUpText>
      </SignUpButton>
     
    </Container>
  )
}

export default Login;