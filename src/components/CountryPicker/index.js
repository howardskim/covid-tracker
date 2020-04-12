import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';
import axios from 'axios';

export default function CountryPicker(props) {
    const [countries, setCountries] = useState([])
    const url = "https://covid19.mathdro.id/api"
    useEffect(() => {
        const getCountries = async () => {
            const response = await axios.get(`${url}/countries`);
            let countries = response.data.countries.map((country) => {
                return country.name
            })
            setCountries(countries);
        };
        getCountries();
    }, [])
    const handleChange = (e) => {
        console.log(e.target.value)
        props.handleCountryChange(e.target.value)
    }
    return (
      <FormControl className={styles.formControl}>
        <NativeSelect onChange={handleChange}>
          <option value="global">Global</option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    );
}
