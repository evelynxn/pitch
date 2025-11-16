import { useState, useRef, useEffect } from 'react'
import useAudioContext from './useAudioContext'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import useInterval from './useInterval'
import {scale, freqToMidi, midiToNote, freqToNote, greatestFreq} from "./utils/music";

function App() {
  const audioContext = useAudioContext();
  const pitchDetector = useRef();
  const [freq, setFreq] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false); //set model to empty first 
  const [frequencies, setFrequencies] = useState([]); // set frequency array to empty 
   
  useEffect(()=> {
    (async()=> {
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      const MODEL_URL = '/crepeModel/'; 

      pitchDetector.current = ml5.pitchDetection(
        MODEL_URL,
        audioContext.current,
        micStream,
        ()=> setModelLoaded (true)
      );
    })();
  }, []);

  useInterval(()=>{
   
    if (!modelLoaded|| !pitchDetector.current) return;
    const detectPitch = () => {
      pitchDetector.current.getPitch((err,freq)=>{
        if (err) {
          console.log(err);
        } else if (freq){
          if (frequencies.length <10){
            setFrequencies([...frequencies,freq]);
          } else if (frequencies.length >= 10){
            setFrequencies([...frequencies.slice(1), freq]);
          }
        }
      });
    };
    detectPitch();
  }, 1000/30);

  //convert frequencies into midi number and filter 
  const midis = frequencies.map(freqToMidi).filter(midiNum => midiNum!= null);
  const midi = greatestFreq(midis);

  return (
    <>
      <div className = "Pitch app">
      {modelLoaded? <p>Model is loaded</p>: <p>Model not loaded</p>} 
      <p>{midiToNote(midi)}</p>
      </div>
    </>
  )
}
export default App
