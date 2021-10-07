import React, { useState } from "react";
const stations = require('vbb-stations')


function App1() {
  const [foodState, setFoodState] = useState([]);
  const [show, setShow] = useState(false);
  function toggleShow (){
    setShow(!show)
    }
  function componentDidMount() {
    console.log("done")
    fetch("https://v5.vbb.transport.rest/stops/nearby?latitude=52.52725&longitude=13.4123")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setFoodState(
            result
          );
          setShow(true);
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          setFoodState([]);
        }
      )
  }
  return (
    <div className="container p-5">
      <button onClick={() => componentDidMount()}> test </button>
      <button onClick={() => toggleShow()}> show </button>
      {show && foodState.length !== 0 ? 
      <div>
        <p> Data : <br/> Name : {foodState[0].name} <br/> Distance : {foodState[0].distance} </p> </div> 
        : show && foodState.length == 0 ? <div>
        <p>there is no data</p></div> : null} 
    </div>
  );
}

export default App1;