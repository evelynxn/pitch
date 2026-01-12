
export default function InstrumentButton ({onInstrumentButtonClick, instrumentName, selectedInstrument}){
    return (
        <>
        <button type="button" className={selectedInstrument === instrumentName? "activeInstrument": ""} onClick ={()=>onInstrumentButtonClick(instrumentName)}>
          {instrumentName}
        </button>
        </>
    )
}