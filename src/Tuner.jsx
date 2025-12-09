import './App.css';
import guitar from './assets/images/guitar.png';

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

export function GuitarTuner({ onInstrumentChange }) {
    return (
      <div className="tuner">

        <div className="button-row">
          <button type="button" onClick={() => onInstrumentChange("guitar")}>
            Guitar
          </button>

          <button type="button" onClick={() => onInstrumentChange("ukulele")}>
            Ukulele
          </button>

          <button type="button" onClick={() => onInstrumentChange("bass")}>
            Bass
          </button>
        </div>
      </div>
    );
  }

  function guitarSetup  (){
    
  }


