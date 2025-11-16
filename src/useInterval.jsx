import {useEffect, useRef} from "react";

export default function useInterval(callback, delay){
    const savedCallback = useRef(); //save the latest call back function

    useEffect(()=>{
        savedCallback.current = callback; //save callback when it changes 
    }, [callback]); 

    useEffect(()=>{
 
        if (delay!= null){ 
            let id = setInterval(()=> savedCallback.current(), delay); // call the callback function with the set delay 
            return () => clearInterval(id);
        }
    }, [delay]); //only update when delay is changed 
}
