import React, { useState } from "react";
import { useEffect } from "react"
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;


export default function MovieInfoComponent({selectedMovie,onMovieSelect}) {
    const [moviInfo,setMovieInfo]= useState({})
    const {Title,imdbRating,Poster,Language,Rated,Year,Runtime,Director,Released,Actors}=  moviInfo
   console.log(moviInfo)
   console.log(selectedMovie)

//    title, release date, overview, and ratings
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?t=${selectedMovie}&apikey=70dad08f`)
      .then((response) => response.json())
      .then((data) => setMovieInfo(data));
  }, [selectedMovie]);
  return (
    <div>
        <Container>
        <CoverImage src={Poster} alt={Title} />
        <InfoColumn>
            <MovieName>
              MovieName: <span>{Title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Rating: <span>{imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{Runtime}</span>
            </MovieInfo>
           <MovieInfo>
              Director: <span>{Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{Actors}</span>
            </MovieInfo>
            <h1 onClick={()=>{onMovieSelect(null)}}>X</h1>
            </InfoColumn>
            </Container>
    
    
     
     
    </div>
  )
}
