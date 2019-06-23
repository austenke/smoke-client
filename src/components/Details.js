import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        const pathname = window.location.pathname;
        const paths = pathname.split('/');
        const playlistName = decodeURI(paths[2]);
        const userId = paths[3];
        const playlistId = paths[4];
        const query = decodeURI(paths[5]);

        this.state = {
            playlistName: playlistName,
            id: userId + "-" + playlistId,
            url: `https://open.spotify.com/embed/user/${userId}/playlist/${playlistId}`,
            query: query
        }
    }

    back = () => {
        this.setState({
            redirect: true
        })
    };

    addRemove = () => {
        if (this.props.savedPlaylists.includes(this.state.id)) {
            this.props.deletePlaylist(this.state.id);
        } else {
            this.props.addPlaylist(this.state.id);
        }
    };

    render() {
        return(
            <ul className="list-group">

                {
                    this.state.redirect &&
                    <Redirect to={`/search/${this.state.query}`} />
                }

                <li key="main" className="list-group-item">
                    <button className="btn float-left mt-2"
                            onClick={this.back}>
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    <div className="row justify-content-center">
                        <div className="row mt-2">
                            <div className="text-center mr-2">
                                <h2>{this.state.playlistName}</h2>
                            </div>
                            {
                                !this.props.savedPlaylists.includes(this.state.id) &&
                                <button className="btn btn-warning" onClick={this.addRemove}>
                                    <i className="fa fa-plus"/>
                                </button>
                            }
                            {
                                this.props.savedPlaylists.includes(this.state.id) &&
                                <button className="btn btn-success" onClick={this.addRemove}>
                                    <i className="fa fa-minus"/>
                                </button>
                            }
                        </div>
                    </div>
                </li>
                <div className="row mt-3" align="center">
                    <div className="card w-100 h-100">
                        <iframe src={this.state.url} width="300" height="550" frameborder="0" allowtransparency="true" allow="encrypted-media" className="w-100 playlist"></iframe>
                        <div className="spinner-border playlist-spinner" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </ul>
        )
    }

}