import { useRouteError } from "react-router-dom";
const Error=()=>{
    const er =  useRouteError();
    return(
        <div>
            <h1>Oops something  went Wrong</h1>
            <h1> {er.status+" : "+er.statusText}</h1>
        </div>
    )
}
export default Error;