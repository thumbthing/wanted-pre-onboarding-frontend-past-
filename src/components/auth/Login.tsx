import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../request/Api";

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
    <>
      <h1>로그인</h1>
      <h2>아이디</h2>
        <input
          data-testid = "email-input"
          type="email"
          value={ id }
          onChange={ (e) => setId(e.target.value) }
        />
      <h2>비밀번호</h2>
        <input
          data-testid = "password-input"
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value)}
        />
      <button
        data-testid="signin-button"
        onClick={ signIn }
        disabled = { disable }
      >로그인</button>
    </>
  )
}