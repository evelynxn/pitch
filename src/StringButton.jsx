export default function StringButton ({ freq, label, selectedString, onStringButtonClick}){
    return (
        <>
        <button type ="button" className={selectedString === freq ? "active" : ""} onClick={()=>onStringButtonClick(freq)}>{label}</button>
        </>
    )
}