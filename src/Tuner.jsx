import { useState,useEffect } from 'react';
import guitar from './assets/images/guitar.png';
import noteSymbol from './assets/images/noteSymbol.png';
import './App.css';
import StringButton from './stringButton';
import InstrumentButton from './InstrumentButton';
import {STRING_SETS} from "./stringSets"
import Instrument from './Instrument';


export default function Tuner({onStringButtonClick, selectedString, selectedInstrument, onInstrumentButtonClick, angle}) {
  const [selectedNote, setSelectedNote] = useState("E");
 //get note letter from frequency 
  useEffect(()=>{
    const string = STRING_SETS.guitar.find(
      (string) => string.freq == selectedString
    );
    if(string) setSelectedNote(string.label);
3
  },[selectedString]);

  return (
    <>
    <div className='tuner'>

      <div className='left'>

        {/* <div className="top-bar"> 
          <img src={noteSymbol} alt="music notes" className='note-symbol' height = "50px" width="auto"/> 
          <p style={{ color: 'white' }}> Online Tuner</p>
        </div>

        <div className='instrument-label'>
          <h1  className = "display-text"> GUITAR 6-STRING</h1>
          <h2  className ="display-text"> STANDARD</h2>
        </div>

        <div className='tuner-display'>
          <svg viewBox="0 0 200 40" className='tuner-arc' width = "80%" height = "auto" >
            <polygon points = "85 0, 100 25, 115 0" fill="#91713C"/>
          </svg>
          <svg viewBox="0 0 200 100" className='tuner-arc' width = "80%" height = "auto" >
            <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#673B20" strokeWidth="4"/>
            <text x="85" y="85" font-family="Arial" font-size="50" fill='black'> {selectedNote} </text>
            
            <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 100px", transition: "transform 0.12s linear",}}>
              <line x1="100" y1="100" x2="100"  y2="20" stroke="red" strokeWidth="3" />
            </g>
          </svg> */}
        {/* </div> */}
      </div>

      <div className = 'right'>
        <Instrument onStringButtonClick= {onStringButtonClick} selectedInstrument = {selectedInstrument} onInstrumentButtonClick = {onInstrumentButtonClick}/>
      </div>
</div>
    </>
    );
  }
