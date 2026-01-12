import {useRef, useEffect} from "react";

function useAudioContext(){ //make audio context hook
    const audio = useRef();
    useEffect(()=>{
        audio.current = new (window.AudioContext || window.webkitAudioContext)();
    }, []);
    return audio;
}

export default useAudioContext