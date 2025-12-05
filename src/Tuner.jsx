import './App.css';
export default function Tuner({freq,diff,note}){
    return (
        <>
        <div className='tunerDisplay'>

        </div>

        <div className="selectDisplay">

        </div>

        <div class= "buttonDisplay">
            <button  className= "instrumentButton" > Guitar</button>
            <button className= "instrumentButton"> Ukelele</button>
        </div>

        </>
    )
}

