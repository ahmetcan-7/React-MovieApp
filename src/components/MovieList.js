import React from "react";
import { Link } from "react-router-dom";


const MovieList = (props) => {

    const truncate = (string, maxLength) => {
        if (!string) return null;
        if (string <= maxLength) return string;
        return `${string.substring(0, maxLength)}...`;
    }


    return (
        <div className="row">



            {props.movies.map((movie, i) =>
                <div className="col-lg-4" key={i}>
                    <div className="card mb-4 shadow-sm">
                        <img src={movie.imageURL} alt="sampleimage" className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{movie.name}</h5>
                            <p className="card-text">{truncate(movie.overview, 160)}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button type="button" className="btn btn-md btn-outline-danger" onClick={() => props.deleteMovieProps(movie)}>Delete</button>

                                <Link type="button"
                                    className="btn btn-md btn-outline-warning"
                                    to={`edit/${movie.id}`}
                                >Edit</Link>
                                <h2><span className="badge badge-info">{movie.rating}</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    )

}


export default MovieList;