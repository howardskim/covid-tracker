import React from 'react';
import Cards from './components/Cards/index.js';
import Chart from './components/Chart/index.js';
import CountryPicker from './components/CountryPicker/index.js';
import axios from 'axios';
import './App.css';
import image from './images/image.png'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      confirmed: '',
      recovered: '',
      deaths: '',
      lastUpdate: '',
      url: "https://covid19.mathdro.id/api",
      dailyData: [],
      country: ''
    }
  };
  handleCountryChange = async (country) => {
    if(country === 'global'){
      this.setState({
        country: ''
      });
      this.fetchAllData();
    } else {
      const response = await axios.get(`${this.state.url}/countries/${country}`);
      let { confirmed, recovered, deaths, lastUpdate } = response.data;
        this.setState({
          confirmed,
          recovered,
          deaths,
          lastUpdate,
          country
        });
    }
  }
  fetchDailyData = async () => {
    try
    {
      const response = await axios.get(`${this.state.url}/daily`);
      this.setState({
        dailyData: response.data
      })
    }
    catch(err)
    {
      console.log(err)
    }
  }
  fetchAllData = () => {
    axios.get(this.state.url).then((res) => {
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
  componentDidMount(){
    this.fetchAllData();
  }
  render(){
    return (
      <div className="container">
        <img src={image} className="image" />
        <small>By Howard Kim 🤢 </small>
        <Cards data={this.state} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={this.state} country={this.state.country} />
      </div>
    );
  }
}

export default App;
