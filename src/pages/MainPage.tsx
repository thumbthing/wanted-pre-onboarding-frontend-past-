import { useNavigate } from "react-router-dom"

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <button value="로그인" onClick={() => navigate('/signin')} />
      <button value="회원가입" onClick={() => navigate('/signup')} />
    </>
  )
}