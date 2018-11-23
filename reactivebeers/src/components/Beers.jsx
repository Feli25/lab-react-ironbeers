import React, { Component } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Beers extends Component {
  constructor(){
    super();
    this.state = { listOfBeers: [], isLoading: true };
}
  getAllBeers = () =>{
    axios.get('https://ironbeer-api.herokuapp.com/beers/all')
    .then(beerArray => {
      this.setState({
        listOfBeers: beerArray.data,
        isLoading: false
      })
    })
  }
  componentDidMount() {
    this.getAllBeers();
  }
  render() {
    if(this.state.isLoading) {
      return(
        <div>Loading....</div>
      )
    }
    console.log(this.state.listOfBeers[0])
    return (
      <div>
        <Navbar />
        <div className="beerList">
          {this.state.listOfBeers.map((beerObject)=>{
            return(
            <div key={beerObject._id} className="card-border">
              <img src={beerObject.image_url} alt={beerObject.name} height="100px"/>
              <div className="card-body">
                <h3>{beerObject.name}</h3>
                <h4>{beerObject.tagline}</h4>
                <p>Created by: {beerObject.contributed_by}</p>
                <Link to={`/beers/${beerObject._id}`}>Details!</Link>
              </div>
            </div>)
          })}
        </div>
      </div>
    )
  }
}
