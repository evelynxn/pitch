import { useState, useRef, useEffect } from 'react';
import useAudioContext from './useAudioContext';
import './App.css';
import useInterval from './useInterval';
import {GuitarTuner} from './Tuner'
const MODEL_URL = "/crepeModel/"; 

function App() {
  const audioContext = useAudioContext();
  const pitchDetector = useRef(null);
  const [freq, setFreq] = useState();
  const [modelLoaded, setModelLoaded] = useState(false); //set model to empty first 
  const [string, setString] = useState(null); // difference of pitch from desired pitch
  const [instrument, setInstrument] = useState("guitar");
  
  useEffect(()=> {
    (async()=> { 
      //wait for user mic stream
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      //initialized ml5 crepe model
      pitchDetector.current = ml5.pitchDetection(
        MODEL_URL,
        audioContext.current,
        micStream,
        () => setModelLoaded (true) 
      );
    })();
  },[]);

  //detect pitch every 1000/30 seconds and update accordingly
  useInterval(() => {
    if (!modelLoaded || !pitchDetector.current) return;
    const detectPitch = () => {
      pitchDetector.current.getPitch((err,freq)=>{
        if (err) {
          console.log(err);
        } else if (freq){
          console.log(freq);
          setFreq(freq);
        }
      });
    };
    detectPitch();
  }, 1000/30);


  function handleInstrumentChange(name) {
    setInstrument(name);
  }

  function handleStringChange(string){
    setString(string);
  }

  return (
    <>
      {modelLoaded? <p>Model is loaded</p>: <p>Model not loaded</p>} 

      <p>Frequency:{freq}</p>
      <p>string{string}</p>


      <GuitarTuner onInstrumentChange={handleInstrumentChange} />
      <p>Current instrument: {instrument}</p>

    </>
  )
}

export default App
