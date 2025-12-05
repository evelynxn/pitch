export const scale =  ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

//find midi number from frequency
export function freqToMidi(freq){ 
    if (!freq) return;
    const mathlog2 = Math.log(freq/440)/Math.log(2);
    let midi = Math.round(mathlog2) + 69;
    return midi;
};

//find the note name from midi number
export const midiToNote = midiNum => {
    if (midiNum == null) return null;
    return scale[midiNum%12]; 
};

//find note from frequency 
export const freqToNote = freq => {
    let midi = freqToMidi (freq); 
    if (midi == null) return;
    return midiToNote(midi);
};

export const greatestFreq = (FreqArray)=>{
    var freqMapping = {};
    var greatestFreq = 0;
    var mostLikeyFreq = 0;
    for (const freq of FreqArray){
        freqMapping[freq] = (freqMapping[freq] || 0) + 1; //if value is empty make 1, if not then add 1
        if (greatestFreq < freqMapping[freq]){
            greatestFreq = freqMapping[freq];
            mostLikeyFreq = freq;
        }
    }
    return mostLikeyFreq;
}

export const modeWithConfidence = (arr, limit) => {
    var numMapping = {};
    var greatestFreq = 0;
    var mode;
    for (const number of arr) {
      numMapping[number] = (numMapping[number] || 0) + 1;
  
      if (greatestFreq < numMapping[number]) {
        greatestFreq = numMapping[number];
        mode = number;
      }
    }
  
    let modalMisses = 0;
    for (const [key, frequency] of Object.entries(numMapping)) {
      if (Number(key) !== mode) {
        modalMisses += frequency;
      }
    }
    return { mode, greatestFreq, modalMisses };
  };

