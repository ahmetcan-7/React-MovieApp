import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {



    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-row mb-5">
                    <div className="col-10">
                        <input type="text" className="form-control" placeholder="search a movie"
                            onChange={this.props.handleSearch}>

                        </input>
                    </div>

                    <div className="col-2">
                        <Link
                            to="/add"
                            type="button"
                            className="btn btn-md btn-primary"
                            style={{ float: 'right' }}>Add Movie
                        </Link>
                    </div>

                </div>
            </form>
        )
    }
}


export default SearchBar;