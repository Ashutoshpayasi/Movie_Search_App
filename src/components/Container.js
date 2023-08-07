
import styled from "styled-components";
import React, { useState } from 'react'
import MovieComponent from "./MovieComponent";
import MovieInfoComponent from "./MovieInfoComponent";

const Containers = styled.div`
display: flex;
flex-direction: column;
`
const Header = styled.div`
background-color: black;
color: white;
display: flex;
justify-content: space-between;
flex-direction: row;
align-items: center;
padding: 10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`

const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;


const SearchBox = styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
border-radius: 6px;
margin-left: 20px;
width: 80%;
background-color: white;

`
const SearchInput = styled.input`
   width:500px;
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const SearchIcon = styled.img`
  width: auto;
  height: 30px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
export default function Container() {
    const [inputsearch,setInputsearch] = useState()
    const [timeOutid,settimeOutid] = useState()
    const [movieList,updateMovielist]=useState([])
    const [selectedMovie, onMovieSelect] = useState(null);



    const fetchData= async (searchString)=>{
            try{
                const responce= await fetch(`https://www.omdbapi.com/?s=${searchString}&apikey=70dad08f`);
                if(!responce.ok){
                    throw new Error(`HTTP error! Status: ${responce.status}`);
                }
                const Data= await responce.json()
                updateMovielist(Data.Search)
                setInputsearch('')
            }
            catch(error){
                console.log("error fetching data",error)
                updateMovielist([])
            }
    }

   const onTextchange= (e)=>{
            clearTimeout(timeOutid)
            setInputsearch(e.target.value)
            const time= setTimeout(()=>fetchData(e.target.value),500)
            settimeOutid(time)
   }
    return (
        <div>
            <Containers>
                <Header>
                     <MovieImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKvmv9wkGaWwu7JpcNKm1bLCfGhRcWzYoSNlNV1fjDmA&s'></MovieImage>
                    <AppName>
                        Movie Search App
                    </AppName>
                    <SearchBox>
                        <SearchIcon  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUK5yxGWfW4pCzDHfh123WsdJdxj8b4GlQct5v_t5zxA&s'/>
                        <SearchInput
                            placeholder="enter movie name"
                            value={inputsearch}
                            onChange={onTextchange}></SearchInput>
                    </SearchBox>
                </Header>
                {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
        <MovieListContainer>
        {  
    movieList && movieList.length > 0 ? (
     movieList.map((movie,index)=>{
        return <MovieComponent key={index} movie={movie}  onMovieSelect={onMovieSelect} />
     })
        
    ) : (
      <p>No movies found.</p>
    )
  } </MovieListContainer>
  </Containers>

        </div>
    )
}
