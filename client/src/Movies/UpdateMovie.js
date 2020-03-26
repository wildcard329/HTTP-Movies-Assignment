import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {
    const {id} = useParams();
    const {push} = useHistory();
    const [movie, setMovie] = useState(initialMovie)

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        if(e.target.name === 'metascore') {
            value = parseInt(value);
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }
    console.log("form",props)
    useEffect(() => {
        const movieToUpdate = props.movieList.find(e => `${e.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
            console.log('useeffect',movieToUpdate)
        }
    }, [props.movieList, id])

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                setMovie(res.data);
                console.log('submit',props.movieList)
                const newMoviesArray = props.movieList.map(e => {
                    if (`${e.id}` === id) {
                        return movie
                    } else {
                        return e;
                    }
                })
                props.setMovieList(newMoviesArray)
                push(`/`);
            })
            .catch(err => console.log(err));
    }

    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    onChange={handleChanges}
                    placeholder="movie title"
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChanges}
                    placeholder="movie director"
                    value={movie.director}
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={handleChanges}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie;