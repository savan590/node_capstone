import  JobForm  from "../component/createjob/createjob.jsx";
import JobImage from '../assets/job.png'

function AddJob(){
    return(
        <div style={{display:"flex"}}>
            <JobForm/>
            <img style={{height:"100vh", width:"50vw"}}  alt='' src={JobImage}/>
        </div>    
        )
}

export default AddJob;