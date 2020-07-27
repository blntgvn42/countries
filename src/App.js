import React, { useEffect, useState } from 'react';
import './App.css';

import Country from './components/Country';
import { Grid } from '@material-ui/core';
import { useStateValue } from "./StateProvider"
import { SpinningCircles } from "svg-loaders-react"

function App() {
  const [{ countries }, dispatch] = useStateValue()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://restcountries.eu/rest/v2/all")
        .then(response => response.json())
        .then(data => {
          const newData = [...data];
          newData.forEach(country => {
            delete country.topLevelDomain;
            delete country.alpha2Code;
            delete country.callingCodes;
            delete country.altSpellings;
            delete country.timezones;
            delete country.numericCode;
            delete country.translations;
            delete country.regionalBlocs;
            country.currencies = country.currencies[0].name
            country.languages = country.languages.map(language => language.name)
          })
          setLoading(true)
          dispatch({
            type: "GET_COUNTRIES",
            payload: data
          })
        })
    };
    getCountries();
  }, [])

  return (
    <div className={`app ${loading ? "loaded" : "loading"}`}>
      {
        loading
          ? (
            <Grid container spacing={3}>
              {
                countries.map((country, index) => (
                  <Grid item
                    xs={6}
                    sm={3}
                    key={index}>
                    <Country country={country} />
                  </Grid>
                ))
              }
            </Grid>
          ) : (
            <div>
              <SpinningCircles />
              <div className="app__loading--text">Loading</div>
            </div>
          )
      }
    </div >
  );
}

export default App;
