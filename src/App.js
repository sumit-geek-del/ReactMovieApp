import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import React, { useState } from 'react';
import axios from "axios";
import MovieInfoComponent from "./components/MovieInfoComponent";
const API_KEY='f0efcbbe';


const Container = styled.div`
display:flex;
flex-direction:column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #2c3a47;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 8px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: #fff;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: #fff;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
color: black;
font-size: 16px;
font-weight: bold;
border:none;
outline:none;
margin-left: 15px;
`;
const MovieListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
gap:24px;
justify-content: space-evenly;
`;
function App() {
  const [seachQuery, updateSeachQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, setMovieList] = useState([]);

  const [selectedMovie, onMovieSelect] = useState();

  const fetchData =async (searchString)=>{
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    setMovieList(response.data.Search);
  }
  const onTextChange = (event)=>{
    clearTimeout(timeoutId);
    updateSeachQuery(event.target.value);
    const timeout = setTimeout(()=>{
      fetchData(event.target.value);
    },500);
    updateTimeoutId(timeout);
  }
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/cinema.png" />
          Movie Love ❤️
        </AppName>
        <SearchBox>
          <SearchIcon src="/icons8-search-24.png" />
          <SearchInput placeholder="Search Movie" value = {seachQuery} onChange={onTextChange}/>
        </SearchBox>
      </Header>
      {
        selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />
      }
      <MovieListContainer>
      {
        movieList?.length? movieList.map((movie, index)=><MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>
        ):"No Movie Found!"
      }
        
      </MovieListContainer>
    </Container>
  );
}

export default App;
