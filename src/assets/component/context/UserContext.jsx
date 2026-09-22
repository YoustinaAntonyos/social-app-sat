import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext('');

export default function UserProvider({ children }){
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [ userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))

    async function getUserInfo(){
        try{

            const config = {
                url:  `https://route-posts.routemisr.com/users/profile-data`,
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            const {data} = await axios.request(config)
            console.log('data profile', data);
            setUserInfo(data.data.user)
            localStorage.setItem('userInfo', JSON.stringify(data.data.user))
            

        } catch(error){
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getUserInfo()
    },[token]);

    return <UserContext.Provider value={{token, setToken, userInfo}}>
        {children}
    </UserContext.Provider>
}