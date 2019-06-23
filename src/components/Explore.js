import React from 'react'
import {Link} from 'react-router-dom'

export default class Explore extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.loggedIn) {
            this.props.explore();
        } else {
            this.props.exploreAnon();
        }
    }

    render() {
        return(
            <div className="container">
                <div className="text-center">
                    <h2 className="text-white">Explore</h2>
                </div>
                {
                    this.props.exploreCards &&
                    this.props.exploreCards.map(exploreCard =>
                        <div key={exploreCard.id}>
                            <div className="text-left">
                                <button className="btn-link">
                                    <Link to={"/profile/" + exploreCard.id} className="btn-link">
                                        <h3 className="text-white">{exploreCard.displayName}</h3>
                                    </Link>
                                </button>
                            </div>
                            <div className="border-top">
                                <div className="card mt-4 mb-3">
                                    <iframe
                                        src={`https://open.spotify.com/embed/user/${exploreCard.playlistId.split("-")[0]}/playlist/${exploreCard.playlistId.split("-")[1]}`}
                                        width="300" height="380" frameborder="0" allowtransparency="true"
                                        allow="encrypted-media" className="w-100 playlist"></iframe>
                                    <div className="spinner-border playlist-spinner" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

}