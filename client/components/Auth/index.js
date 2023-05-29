import React, { useRef, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import _ from 'lodash';
import gql from 'graphql-tag';
import {
  AuthContainer, 
  Container, 
  Form, 
  Input, 
  InputContainer, 
  NamesContainer, 
  AuthHeader,
  InputLabel,
  BtnSubmit,
  Error,
  ExitIcon,
  AuthSubheader
} from '../../shared/Auth/index.sc.js';
import { AuthContext } from '../../context/authContext.js';
import close from '../../../build/assets/icons/close.svg';

const CREATE_USER = gql`
   mutation (
     $first_name: String!
     $last_name: String!
     $email: String!
     $password: String!
    ) {
      signUp(
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
      ) {
        token
      }
    }   
`

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;


const Auth = ({ refetch }) => {  
  const { register, handleSubmit, watch, setError, errors } = useForm();
  const { showAuthModal,onShowAuthModal, onShowSettingsMenu } = useContext(AuthContext);
  const [signUp] = useMutation(CREATE_USER);
  const [signIn] = useMutation(SIGN_IN);
  const isLogin = showAuthModal === 'login';
  const authText = isLogin ? 'Sign in' : 'Sign up';
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false)
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    }
  });

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {          
      onShowAuthModal('');
    }
  };

  const onSubmit = async ({ first_name, last_name, email, password }) => {
    
    if (isLogin) {
      try {
        const signInData = await signIn({
          variables: {
            email,
            password
          }
        });
        const token = signInData.data.signIn.token;
        localStorage.setItem('token', token);
        onShowAuthModal('');
        onShowSettingsMenu(false);
        refetch();
      }
      catch (error) {

        const fullError = error.graphQLErrors[0].error;
        const errorCode = fullError.extensions.code;

        if (errorCode === 'BAD_USER_INPUT') {
          setError("email", {
            type: "manual",
            message: fullError.message
          })
        }
        else if (errorCode === 'UNAUTHENTICATED') {
          setError("password", {
            type: "manual",
            message: fullError.message
          })
        }
      }
    }
    else {      
      try {
        const signUpData = await signUp({
          variables: {
            first_name,
            last_name,
            email,
            password
          }
        });
        const token = signUpData.data.signUp.token;
        localStorage.setItem('token', token);
        onShowAuthModal('');
        onShowSettingsMenu(false);
        refetch();
      }
      catch (error) {
        const fullError = error.graphQLErrors[0].error;
        const errorCode = fullError.extensions.code;

        if (errorCode === 'BAD_USER_INPUT') {
          setError("email", {
            type: "manual",
            message: fullError.message
          })
        }
      }
    }
  };

  return (
    <Container>
     <AuthContainer id="auth" ref={wrapperRef}>
      <ExitIcon src={close}onClick={() => {onShowAuthModal("")}}/>
      <AuthHeader>{isLogin ? 'Sign In' : 'Sign Up'}</AuthHeader>
        <AuthSubheader onClick={() => { 
          isLogin ? onShowAuthModal('signup') : onShowAuthModal('login')
      }}>{
        isLogin
          ? <div>Don't have an account?<span>Sign Up</span></div>
          : <div>Have an account?<span>Sign In</span></div>
      }</AuthSubheader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {!isLogin ? (
          <NamesContainer>
          <InputContainer>
            <InputLabel>First Name</InputLabel>
            <Input
              name="first_name"
              placeholder="First Name"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Name must contain only letters from the alphabet."
                }
              })}
              />
            {errors.first_name && <Error>{errors.first_name.message}</Error>}
          </InputContainer>

          <InputContainer>
            <InputLabel>Last Name</InputLabel>
            <Input
              name="last_name"
              placeholder="Last Name"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[a-z ,.'-]+$/i,
                  message: "Name must contain only letters from the alphabet."
                }
              })}
              />
              {errors.last_name && <Error>{errors.last_name.message}</Error>}
          </InputContainer>
        </NamesContainer>
        ) : null}
        
        <InputContainer>
          <InputLabel>Email</InputLabel>
          <Input
              name="email"
              placeholder="Email"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address."
              }
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </InputContainer>

        <InputContainer>
          <InputLabel>Password</InputLabel>
          <Input
            name="password"
              type='password'
              placeholder="Password"
            ref={register({
              required: "Required",
              minLength: !isLogin ? { value: 6, message: 'Password must be at least 6 characters long' } : null
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </InputContainer>
          {!isLogin && (
            <InputContainer>
            <InputLabel>Confirm Password</InputLabel>
            <Input
                name="confirmPassword"
                placeholder="Confirm Password"
              type='password'
              ref={register({
               required: "Required",
               validate: (value) => value === watch('password') || "Passwords don't match."
              })}
            />
            {errors.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}
          </InputContainer>
          )}
        <InputContainer>
            <BtnSubmit type='submit' value={authText} />
        </InputContainer>
      </Form>
     </AuthContainer>
    </Container>
  );

};
export default Auth;
