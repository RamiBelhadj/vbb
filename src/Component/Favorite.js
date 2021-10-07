import React, { useState } from "react";
const stations = require('vbb-stations')
var Station = stations('all');
var namestation=[];
var i = 0;

while(i<=Station.length-1){
    namestation.push(Station[i].name);
    i++;
} 
function App1() {
  const [foodState, setFoodState] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedStop , setSelectedStop] = useState("");
  const [Departure , setDeparture] = useState([]);
  const [ListOfFav , setListOfFav] = useState([]);
  function toggleShow (){
    setShow(!show)
    }
    function getDepartures(id="900000013102"){
        fetch("https://v5.vbb.transport.rest/stops/"+id)
        .then(res => res.json())
        .then(
          (result) => {
            setDeparture(
                Object.keys(result.products).filter(ele => result.products[ele])
            );
          },
          
          (error) => {
            setDeparture([]);
          }
        )



    }
  function componentDidMount() {
    fetch("https://v5.vbb.transport.rest/stops/nearby?latitude=52.52725&longitude=13.4123")
      .then(res => res.json())
      .then(
        (result) => {
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
        <p> Data : <br/> Name : {namestation[0].name} <br/> Distance : {namestation[0].distance} </p> </div> 
        : show && foodState.length == 0 ? <div>
        <p>there is no data</p></div> : null} 
        <select onChange={(val) => {setSelectedStop(val.target.value);getDepartures(val.target.value);
        
        
        
        
        
        
        } }>
        <option key={null} value={null}> choose stops </option> 
    {Station.map((ele,index)=> {
        return (
      <option key={index} value={ele.id}> {ele.name} 
            
        </option> 
    )})
    }
    </select>
    <button onClick={() => {
        var favorites=ListOfFav;
        favorites.push(selectedStop);
        setListOfFav(favorites);
    }}> Add to Favorite </button>
    { Departure && Departure.length !== 0 &&
    <select onChange={(val) => {
        } }>
        <option key={null} value={null}> choose stops </option> 
    {Departure.map((ele,index)=> {return (
        <option key={index} value={ele}> {ele}</option> 
    )})
    }
    </select>
    }
    </div>
  );
}

export default App1;