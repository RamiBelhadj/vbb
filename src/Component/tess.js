import React, { useState } from "react";
import App2 from "./RendTable"
import * as ReactBootStrap from 'react-bootstrap/Button';
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
  const [Departure1 , setDeparture1] = useState({});
  const [ListOfFav , setListOfFav] = useState([]);
  const [Direction , setDirection] = useState([]);
  var valde=Departure1;


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
          })
        }
        function getDepartures1(id="900000013102"){
            fetch("https://v5.vbb.transport.rest/stops/"+id)
            .then(res => res.json())
            .then(
              (result) => {
                setDeparture1(
                    result.stops
                );
              },
            
              (error) => {
                setDeparture1([]);
              })
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
  

  var arr = [];
  if (Departure1!==[]){
  Object.keys(Departure1).forEach(function(key) {
    arr.push(Departure1[key]);
  })}
  //else{arr=Departure1;}
   return (
    <div className="container p-5">
        <select onChange={(val) => {setSelectedStop(val.target.value);getDepartures(val.target.value);getDepartures1(val.target.value);
        
        } }>
        <option key={null} value={null}> choose a Station </option> 
    {Station.map((ele,index)=> {
        return (
      <option key={index} value={ele.id}> {ele.name} 
            
        </option> 
    )})
    }
    
    </select>
    <br/>

    {arr && arr.length !== 0 && <div>
      {App2(arr)}
      </div>}    
    
    <br/>
    { Departure && Departure.length !== 0 &&
    <select  onChange={(val) => {console.log(Departure1)} }>
        <option key={null} value={null}> These stops Options are available choose one of them </option> 
    {Departure.map((ele,index)=> {return (
        <option key={index} value={ele}> {ele}</option> 
    )})
    }
    </select>
    }
    
    <br/>
    <button onClick={() => {
        var favorites=ListOfFav;
        favorites.push(selectedStop);
        setListOfFav(favorites);
    }}> Add to Favorite </button>
    </div>
  );
}
export default App1;


/*<div className="dskd">
    <select onChange={(val) => {console.log(val.Departure);setDirection(val.target.value);getDepartureswithDirection(Departure,val.target.value);
        
    } }>
    <option key={null} value={null}> choose Directon </option> 
{Direction.map((ele,index)=> {
    return (
  <option key={index} value={ele.target.id}> {ele.name} 
        
    </option> 
)})
}


</select>
    



    </div>*/