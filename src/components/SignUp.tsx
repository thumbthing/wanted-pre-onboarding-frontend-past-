import { useEffect, useState } from "react";
import { request } from "../request/Api";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [ id, setId ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ disable , setDisable ] = useState(false);
  const userForm = {
    email: id,
    password: password,
  };
  const navigate = useNavigate();

  useEffect(() => {
    if(id.includes('@') && password.length >= 8) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [id, password]);

  const signUp =async () => {
    try {
      const req = await request.signUp('auth/signup', userForm);
      if(req.status === 201) {
        navigate('/signin');
      }
    } catch (e) {
      console.log(e);
    }  
  }

  return (
    <>
      <h1>회원 가입</h1>
      <h2>아이디</h2>
        <input
          data-testid = "email-input"
          type = "email"
          value = { id }
          onChange = { (e) => setId(e.target.value) }
        />
      <h2>비밀번호</h2>
        <input
          data-testid = "password-input"
          type = "password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          data-testid = "signup-button"
          onClick={ signUp }
          disabled = { disable }
        >회원 가입</button>
    </>
  )
}