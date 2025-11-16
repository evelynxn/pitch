import {useRef, useEffect} from "react";

function useAudioContext(){ //make audio context hook
    const audio = useRef();
    useEffect(()=>{
        audio.current = new (AudioContext || webkitAudioContet)();
    }, []);
    return audio;
}

export default useAudioContext