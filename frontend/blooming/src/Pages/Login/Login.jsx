import Preview from "../../components/Login/Preview"
import Button from "../../components/Login/Button"
import { NavLink } from "react-router-dom"

function Login() {
  return (
    <>
      <Preview />
      <NavLink to={"/Join"}>
        <Button text="카카오톡으로 로그인하기" />
      </NavLink>
    </>
  )
}

export default Login