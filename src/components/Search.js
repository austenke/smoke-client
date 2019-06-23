import React from 'react'
import Playlist from './Playlist'
import { Redirect } from 'react-router-dom'

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        const pathname = window.location.pathname;
        const paths = pathname.split('/');
        const urlQuery = paths[2] === undefined? "" : paths[2];

        this.state = {
            query: urlQuery,
        }

        if (urlQuery) {
            this.props.searchPlaylists(urlQuery);
        }
    }

    queryChanged = (event) => {
        this.setState({
            query: event.target.value
        })
    };

    previewPlaylist = (userId, playlistName, playlistId) => {
        this.setState({
            playlistName: playlistName,
            userId: userId,
            playlistId: playlistId,
            redirect: true
        })
    };

    search = () => {
        if (this.state.query) {
            this.props.searchPlaylists(this.state.query);
        }
    };

    render() {
        return(
            <ul className="list-group">
                <Redirect to={`/search/${this.state.query}`} />

                {
                    this.state.redirect &&
                    <Redirect to={`/details/${this.state.playlistName}/${this.state.userId}/${this.state.playlistId}/${this.state.query}`} />
                }

                <li key="main" className="list-group-item mt-2">
                    <div>
                        <div className="text-center">
                            <h2>Search for playlists</h2>
                        </div>
                        <div className="input-group">
                            <input
                                id="search" type="text" className="form-control"
                                placeholder="Enter names or keywords"
                                value={this.state.query}
                                onChange={this.queryChanged}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={this.search}>Search
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
                <div className="row mt-3" align="center">
                    {
                        this.props.playlists.map(playlist =>
                            <div key={playlist.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                                <Playlist playlist={playlist} previewPlaylist={this.previewPlaylist}/>
                            </div>
                        )
                    }
                </div>
            </ul>
        )
    }

}