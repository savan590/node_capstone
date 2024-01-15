import Navbar  from "../component/header/title"
import  Details  from "../component/view_job/view"
function Detail(){
    return(
        <div style={{background:" #FFEFEF",overflowX:"hidden"}}>
            <Navbar/>
            <Details/>
        </div>
    )
}
export default Detail