import Preview from "../components/Login/Preview"
import LoginButton from "../components/Login/LoginButton"
import { NavLink } from "react-router-dom"

function Login() {
  return (
    <>
      <Preview />
      <NavLink to={"/Join"}>
        <LoginButton />
      </NavLink>
    </>
  )
}

export default Login