import guitarImg from './assets/images/guitar.png';
import { useEffect, useState } from 'react';
import StringButton from './stringButton';
import InstrumentButton from './InstrumentButton';
import { STRING_SETS } from './stringSets';


export default function Instrument({onStringButtonClick, selectedInstrument, onInstrumentButtonClick,selectedString}){
    const [image, setImage] = useState(guitarImg);

    useEffect(()=>{
        if (selectedInstrument === "Bass" ){
            setImage(bassImg);
        }
        if (selectedInstrument === "Ukulele"){
            setImage(ukuleleImg);
        } else {
            setImage(guitarImg)
        }
        
    },[selectedInstrument])

    return <>
<div className="button-row">
        <InstrumentButton onInstrumentButtonClick= {onInstrumentButtonClick} instrumentName = "Guitar" selectedInstrument = {selectedInstrument}/>
        <InstrumentButton onInstrumentButtonClick= {onInstrumentButtonClick} instrumentName = "Ukulele" selectedInstrument = {selectedInstrument}/>
        <InstrumentButton onInstrumentButtonClick= {onInstrumentButtonClick} instrumentName = "Bass" selectedInstrument = {selectedInstrument}/>
      </div>
      <div className='instrument'>

    
    <div className='img-container'>
        <img src={image} alt="guitar" className='instrument-img'/>  
    </div> 

          <div className='left-buttons'>

            {STRING_SETS.guitar
              .filter(string => string.side == "left")
              .map(
                string => (
                  <StringButton freq = {string.freq} label = {string.label} onStringButtonClick = {onStringButtonClick} selectedString = {selectedString}/>
                )
              )}
          </div>

          <div className="right-buttons">
            {STRING_SETS.guitar
              .filter(string => string.side == "right")
              .map(
                string => (
                  <StringButton freq = {string.freq}  label = {string.label} onStringButtonClick = {onStringButtonClick} selectedString = {selectedString}/>
                )
              )}
          </div> 
    </div>
    </>
    }