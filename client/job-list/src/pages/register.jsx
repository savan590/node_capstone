import RegisterForm from '../component/signup/signup'
import LoginImage from '../assets/image 466.png'

function Register(){
    return (
        <div style={{display:"flex", height:"100vh"}}>
            <RegisterForm/>
            <img style={{height:"100vh", width:"50vw"}} alt='' src={LoginImage}/>
        </div>
    )
}

export default Register;