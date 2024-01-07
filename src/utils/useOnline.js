import { useEffect, useState } from "react";
const useOnline=()=>{
    const [isOnline, setisOnline]=useState(true);
    useEffect(()=>{
        window.addEventListener("online",()=>{
            setisOnline(true);
        });
        window.addEventListener("offline",()=>{
            setisOnline(false);
        });
    },[])
    return isOnline;
}
export default useOnline;