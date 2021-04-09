import React from "react";

import SearchBar from "./SearchBar.js";
import MovieList from "./MovieList.js";
import AddMovie from "./addMovie.js";
import EditMovie from "./EditMovie.js";

import axios from "axios";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";




class App extends React.Component {


    state = {
        movies: [],
        searchQuery: ""
    }



    //axios

    componentDidMount() {
        this.getMovies();

    }

    async getMovies() {
        const baseURL = "http://localhost:3002/movies";
        const response = await axios.get(baseURL);

        this.setState({
            movies: response.data
        })

    }

    //deleter movie
    deleteMovie = async (movie) => {

        const baseURL = `http://localhost:3002/movies/${movie.id}`;
        axios.delete(baseURL);


        const newMovieList = this.state.movies.filter((m) => m !== movie);


        this.setState((state) => ({
            movies: newMovieList
        }))

    }

    //search movie
    search = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    //add movie

    addMovie = async (movie) => {
        await axios.post(`http://localhost:3002/movies/`, movie);
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }))
        this.getMovies();
    }

    //edit movie

    editMovie = async (id, updatedMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie);
        this.getMovies();

    }


    render() {

        let filterMovie = this.state.movies.filter((movie) => {
            return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
        }).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0
        });

        //react fragment is acting like a div
        return (
            <Router>
                <div className="container">
                    <Switch>
                        <Route path="/" exact render={() => (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SearchBar
                                            handleSearch={this.search} />
                                    </div>
                                </div>

                                <MovieList
                                    movies={filterMovie}
                                    deleteMovieProps={this.deleteMovie}
                                />
                            </React.Fragment>
                        )}>

                        </Route>

                        <Route path="/add" render={({ history }) => (

                            <AddMovie
                                onAddMovie={(movie) => {
                                    this.addMovie(movie)
                                    history.push("/")
                                }

                                }
                            />

                        )}>

                        </Route>

                        <Route path="/edit/:id" render={(props) => (

                            <EditMovie
                                {...props}
                                onEditMovie={(id, movie) => {
                                    this.editMovie(id, movie)
                                }

                                }
                            />

                        )}>

                        </Route>







                    </Switch>

                </div>

            </Router >
        );
    }

};


export default App;