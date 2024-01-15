import { LoginForm } from "../component/login/login"
import LoginImage from '../assets/image 466.png'
function Login(){
    return (
        <div style={{ display: "flex" }}>
            <LoginForm />
            <img style={{ maxHeight: "100vh", width: "50vw" }} alt="" src={LoginImage} />
        </div>
    )
}

export default Login;