import { useState } from "react";

const useLocalStorage = (key, initialValue) =>{
    const [storedValue, setStoredValue] = useState(()=>{
        if(typeof window === "undefined"){
            return initialValue
        }
        try{
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }catch(err){
            console.log(err);
            return initialValue;
        }
    })

    const setValue  = (value) =>{
        try{
            setStoredValue(value)
            if(typeof window !== "undefined"){
                localStorage.setItem(key, JSON.stringify(value));
            }

        }catch(err){
            console.log("err", err);
        }
    }
    // setValue(initialValue);

    return [storedValue, setValue]


}

export default useLocalStorage;