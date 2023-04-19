import { useState } from "react";

export default function SignUp() {
  const [ id, setId ] = useState('');
  const [ password, setPassword ] = useState('');
  const userForm = {
    email: id,
    password: password,
  };

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
        <button
          data-testid = "signup-button"
          onClick={ e => console.log("회원가입")}
          disabled = { false }
        >회원 가입</button>
    </>
  )
}