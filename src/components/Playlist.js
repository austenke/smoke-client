import React from 'react'

const Playlist = ({playlist, previewPlaylist}) =>
    <div className="card cardItem">
        <img className="card-img-top" src={playlist.images[0].url} alt="Card image cap"/>
        <div className="card-body">
            <h5 className="card-title">{playlist.name.length > 30? (playlist.name.substring(0, 27) + "...") : playlist.name}</h5>
            <p className="card-text">Creator: {playlist.owner.display_name}</p>
            <a className="btn btn-primary text-white" onClick={() => previewPlaylist(playlist.owner.id, playlist.name, playlist.id)}>Details</a>
        </div>
    </div>

export default Playlist