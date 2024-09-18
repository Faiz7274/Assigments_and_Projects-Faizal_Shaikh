import { useEffect, useState } from 'react';
import './App.css'
import searchIcon from './searchicon.svg'
import MovieCard from './moviecard';

//516b11bd OMDB api
const api_url = "https://omdbapi.com?apikey=516b11bd";
const movie = {
    "Title": "Batman",
    "Year": "1989",
    "imdbID": "tt0096895",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZWQ0OTQ3ODctMmE0MS00ODc2LTg0ZTEtZWIwNTUxOGExZTQ4XkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm , setsearchTerm ] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${api_url}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Batman');
    }, [])

    return (
        <div className="app">
            <h1>MovieFaiz</h1>
            <div className='search'>
                <input
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt='Search'
                    onClick={() => {searchMovies(searchTerm)}}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No Movies Found</h2>
                        </div>
                    )
            }
        </div>

    );
}

export default App;