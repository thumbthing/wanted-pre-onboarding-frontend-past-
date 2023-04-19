import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../request/Api";
import styled from "styled-components";


export default function Login() {
  const [ id, setId ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ disable, setDisable ] = useState(false);
  const userForm = useMemo(() => {
    return {
      email: id,
      password: password,
    };
  }, [id, password]);
  const navigate = useNavigate();

  useEffect(() => {
    if(id.includes('@') && password.length >= 8) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [id, password]);

  useEffect(() => {
    if(localStorage.getItem('access_token')) navigate("/todo");
  })

  const signIn = useCallback( async () => {
    try {
      const response: AxiosResponse = await request.sign('/auth/signin', userForm);
      if(response.status === 200){
        const accessToken: string = response.data.access_token;
    
        localStorage.setItem('access_token', accessToken);
      }
    } catch (e) {
      console.log(e);
    }
    if (localStorage.getItem('access_token')) navigate("/todo");
      
    }, [userForm, navigate]
  )

  return (
    <LoginContainer>
      <LoginBox>
      <LoginTitle>로그인</LoginTitle>
      <StyledH2>아이디</StyledH2>
        <LoginInput
          data-testid = "email-input"
          type="email"
          value={ id }
          onChange={ (e) => setId(e.target.value) }
        />
      <StyledH2>비밀번호</StyledH2>
        <LoginInput
          data-testid = "password-input"
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value)}
        />
      <LoginButton
        data-testid="signin-button"
        onClick={ signIn }
        disabled = { disable }
      >로그인</LoginButton>
      </LoginBox>
    </LoginContainer>
  )
}


const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  padding: 40px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const LoginTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-bottom: 2px solid #0057ff;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #0057ff;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0041cb;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const StyledH2 = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;