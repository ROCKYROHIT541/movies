import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { useState } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

export default function App() {
   const[mov,setmov]=useState([]);
   const [favourites,setFavourites]=useState([]);
   const[searchValue , setsearchvalue]=useState('');

  const getMovieRequest = async (searchValue) => {
    const url =`https://www.omdbapi.com/?s=${searchValue}&apikey=c88f6102`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setmov(responseJson.Search);
    }
    
  };
  useEffect(()=> {
    getMovieRequest(searchValue);
  },[searchValue]);

  const saveToLocalStorage = (items) =>{
    localStorage.setItem('react-movie-app-favourites' , JSON.stringify(items))
  }
  const addFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie];
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
  }
  const removeFavouriteMovie = (movie) =>{
   const newFavouriteList=favourites.filter(
    (favourite) => favourite.imdbID!== movie.imdbID
   );
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
  }
 



  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
       <MovieListHeading heading='MOVIES'/>
       <SearchBox searchvalue={searchValue} setsearchvalue={setsearchvalue}/>
      </div>
      <div className='row'> 

        <MovieList movies={mov} handleFavouritesClick={addFavouriteMovie} favouriteComponent ={AddFavourites}/>
      
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
       <MovieListHeading heading='FAVOURITES'/>
      </div>
      <div className='row'> 

       <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent ={RemoveFavourites}/>

      </div>
    </div>
  );
};
