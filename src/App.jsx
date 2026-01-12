import { useState, useRef, useEffect } from 'react';
import useAudioContext from './useAudioContext';
import useInterval from './useInterval';
import { detectPitchYin } from './detectPitchYin';
import Tuner from './Tuner';



export default function App() {
  const audioContext = useAudioContext();

  const pitchRef = useRef(null);
  const analyserRef = useRef(null);
  const timeBufferRef = useRef(null);
  const sampleRateRef = useRef(null);
  const frequencyBufferRef = useRef(null);

  const [freq, setFreq] = useState();
  const [string, setString] = useState(null); // difference of pitch from desired pitch //stirng conatins frequency 
  const [instrument, setInstrument] = useState(null);
  const [cents, setCents] = useState(null);
  const [angle, setAngle] = useState(null);


  useEffect(()=> {

    let isMounted = true;
    (async()=> { 
      const micStream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false
       });

       if (!isMounted){return;}

      const source = audioContext.current.createMediaStreamSource(micStream);
      const analyser = new AnalyserNode(audioContext.current, { fftSize: 2048 });
      const sampleRate = audioContext.current.sampleRate;
      source.connect(analyser);
    
      const timeBuffer = new Float32Array(analyser.fftSize);
      const frequencyBuffer = new Float32Array(analyser.frequencyBinCount);
    
      analyserRef.current = analyser;
      timeBufferRef.current = timeBuffer;
      sampleRateRef.current = sampleRate;
      frequencyBufferRef.current = frequencyBuffer;
    })();
  },[]);


  useInterval(() => {
    const analyser = analyserRef.current;
    const timeBuffer = timeBufferRef.current;
    const sampleRate = sampleRateRef.current;

    if (!analyser||!timeBuffer||!sampleRate) return;
    analyser.getFloatTimeDomainData(timeBuffer);

      const pitch = detectPitchYin(timeBuffer, sampleRate, 50,1200,0.15);

      if (pitch!== -1){
        pitchRef.current = pitch;
        setFreq(pitch);
      }
      console.log("pitch detected is:" + pitchRef.current);
  }, 1000/30);


  function onStringButtonClick(note){
    setString(note);
  }

  function onInstrumentButtonClick(instrument){
    setInstrument(instrument);
  }

  function getCents(targetFreq, detectedFreq){

    const normalizedFreq = normalizeToOctave(detectedFreq, targetFreq);
    const cents = 1200 * Math.log2(normalizedFreq / targetFreq);
    setCents(cents);
  }

  useEffect(() => {
    if (!freq) return;
    getCents(string, freq);

    console.log( "selected string freq is :" + string);
  }, [freq]);

  function centsToAngle(cents){
    const clamped = Math.max(-50,Math.min(50,cents)); 
    return((clamped/50)*90);
  }

  function normalizeToOctave(freq, target) {
    let f = freq;
  
    // Only normalize if we're clearly in the wrong octave
    if (f > target * 1.8) {
      while (f > target * 1.5) f /= 2;
    } else if (f < target / 1.8) {
      while (f < target / 1.5) f *= 2;
    }
  
    return f;
  }

  useEffect(() => {
    if (!freq) return;
    const targetAngle = centsToAngle(cents);

    setAngle(prev => prev+(targetAngle-prev)*0.15);
    // console.log( "angle" + angle);
  }, [cents]);

  return (
    <>
      <Tuner onStringButtonClick={onStringButtonClick} selectedString={string} selectedInstrument={instrument} onInstrumentButtonClick={onInstrumentButtonClick} angle = {angle} />
    </>
  )
}
