import guitar from './assets/images/guitar.png';
import noteSymbol from './assets/images/noteSymbol.png';
import './App.css';

const STRING_SETS = {
  guitar: [
    { id: "E2", label: "Low E", freq: 82.41 },
    { id: "A2", label: "A",    freq: 110.00 },
    { id: "D3", label: "D",    freq: 146.83 },
    { id: "G3", label: "G",    freq: 196.00 },
    { id: "B3", label: "B",    freq: 246.94 },
    { id: "E3", label: "High E", freq: 329.63 },
  ],
  ukulele: [
    { id: "G4", label: "G", freq: 392.00 },
    { id: "C4", label: "C", freq: 261.63 },
    { id: "E4", label: "E", freq: 329.63 },
    { id: "A4", label: "A", freq: 440.00 },
  ],
  bass: [
    { id: "E1", label: "E", freq: 41.20 },
    { id: "A1", label: "A", freq: 55.00 },
    { id: "D2", label: "D", freq: 73.42 },
    { id: "G2", label: "G", freq: 98.00 },
  ],
};

export default function Tuner() {

  return (
    <>
    <div className='tuner'>

      <div className='left'>

        <div className="top-bar"> 
          <img src={noteSymbol} alt="music notes" className='note-symbol' height = "50px" width="auto"/> 
          <p>Online Tuner</p>
        </div>

        <div className='instrument-label'>
          <h1> Guitar 6-String</h1>
          <h2> Standard</h2>
        </div>

        <div className='tuner-display'>
          <svg viewBox="0 0 200 40" className='tuner-arc' width = "80%" height = "auto" >
            <polygon points = "85 0, 100 25, 115 0" fill="#333"/>
          </svg>
          <svg viewBox="0 0 200 100" className='tuner-arc' width = "80%" height = "auto" >
            <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#333" strokeWidth="4"/>
            <text x="85" y="85" font-family="Arial" font-size="50" color='black'>D</text>
          </svg>

        </div>
      </div>

      <div className='right'>

      <div className="button-row">
        <button type="button">
          Guitar
        </button>
        <button type="button">
          Ukulele
        </button>
        <button type="button">
          Bass
        </button>
      </div>

      <div className='instrument'>
         <div  className='img-container'>
          <img src={guitar} alt="guitar" className='instrument-img'/>  
        </div> 

          <div className='left-buttons'>
          
          <button type ="button" >E</button>
          <button type ="button" >A</button>
          <button type ="button" >D</button> 
          </div>

          <div className="right-buttons">
          <button type ="button" >G</button>
          <button type ="button" >B</button>
          <button type ="button" >E</button> 
          </div>
   
        </div>


    </div>

</div>
    </>
    );
  }
