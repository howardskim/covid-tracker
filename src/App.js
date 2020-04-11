import React from 'react';
import Cards from './components/Cards/index.js';
import Chart from './components/Chart/index.js';
import CountryPicker from './components/CountryPicker/index.js';
import axios from 'axios';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      confirmed: '',
      recovered: '',
      deaths: '',
      lastUpdate: ''
    }
  };
  componentDidMount(){
    const url = "https://covid19.mathdro.id/api";
    axios.get(url).then((res) => {
      let { confirmed, recovered, deaths, lastUpdate } = res.data;
      this.setState({
        confirmed,
        recovered,
        deaths,
        lastUpdate
      })
    }).catch((err) =>{
      console.log(err)
    })
  }
  render(){
    return (
      <div className="container">
        <Cards data={this.state} />
        {/* <Chart />
        <CountryPicker /> */}
      </div>
    );
  }
}

export default App;
