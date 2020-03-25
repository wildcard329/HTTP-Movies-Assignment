import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: ''
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

    useEffect(() => {
        const movieToUpdate = props.movies.find(e => `${e.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [props.movies, id])

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(``, movie)
            .then(res => {
                props.setMovie(res.data);
                push(`/movies-list${id}`);
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
            </form>
        </div>
    )
}

export default UpdateMovie;