import React, { useState } from "react";
import * as ReactBootStrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App2(Departure1) {

const departu=Departure1;
const RenderDeparture =(departu,index) =>{return (
    <tr >
      <td>{departu.id}</td>
      <td>{departu.name}</td>     
      <td>{Object.keys(departu.products).filter(ele => departu.products[ele])}</td>
    </tr>  )}

return(
  <div >
    <ReactBootStrap.Table striped bordered hover>
  <thead>
    <tr >
      <th>ID</th>
      <th>Name</th>
      <th>Products</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{departu.map(RenderDeparture)}</td>
    </tr>
  </tbody>
</ReactBootStrap.Table> </div>
)}
export default App2;