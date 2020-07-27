import React, { useEffect, useState } from 'react';
import './App.css';

import Country from './components/Country';
import { Grid, TextField } from '@material-ui/core';
import { useStateValue } from "./StateProvider"
import { SpinningCircles } from "svg-loaders-react"
//import Search from './components/Search';



function App() {
  const [{ countries, searchResult }, dispatch] = useStateValue()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")


  const handleCountrySearch = (event) => {
    setQuery(event.target.value)
  }

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
            country.latitude = country.latlng[0];
            country.longitude = country.latlng[1];
            delete country.latlng;
            delete country.numericCode;
            delete country.translations;
            delete country.regionalBlocs;
            country.currencies = country.currencies[0].name
            country.languages = country.languages.map(language => language.name)
          })
          setLoading(true)
          dispatch({ type: "GET_COUNTRIES", payload: { data: data } })
        })
    };
    getCountries();
  })

  useEffect(() => {
    setLoading(false)
    const search = async () => {
      await dispatch({ type: "SEARCH_COUNTRY", payload: { query: query } })
      setLoading(true);
    }
    search();
  }, [query])

  return (
    <div className={`app ${loading ? "loaded" : "loading"}`}>
      <TextField
        value={query}
        onChange={handleCountrySearch}
        label="Search Country"
        fullWidth
        variant="outlined" />
      {
        loading
          ? (
            <Grid
              className="app__container"
              container
              spacing={3}>
              {
                searchResult.length > 0
                  ? searchResult.map((country, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      xl={2}
                      key={index} >
                      <Country country={country} />
                    </Grid>
                  ))
                  : countries.map((country, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      xl={2}
                      key={index} >
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
