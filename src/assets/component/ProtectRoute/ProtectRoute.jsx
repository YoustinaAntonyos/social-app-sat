import { useContext } from "react"
import { UserContext } from '../context/UserContext'
import { Navigate } from "react-router";


export default function ProtectRoute({children}) {

    const {token} = useContext(UserContext);

    if (!token){
        // navigate user to login
        return<Navigate to={'/login'} />
    } else{
        //  navigate user to any thing 
        return children
    }

}
