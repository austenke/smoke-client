import React from 'react'

export default class Profile extends React.Component {

    constructor(props) {
        super(props);

        const pathname = window.location.pathname;
        const paths = pathname.split('/');
        const profileId = paths[2] === undefined? this.props.user.id : paths[2];

        this.state = {
            edit: false,
            profileId: profileId,
            email: this.props.user.email,
            password: "",
            displayName: this.props.user.displayName,
            role: this.props.user.role
        };

        this.props.getProfile(this.state.profileId);
    }

    emailChanged = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    displayNameChanged = (event) => {
        this.setState({
            displayName: event.target.value
        })
    };

    passwordChanged = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    roleChanged = (event) => {
        this.setState({
            role: event.target.value
        })
    };

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    };

    render() {
        return(
            <div className="container">
                {
                    this.props.profileLoaded &&
                    <div>
                        <div className="text-center">
                            <h1 className="text-white">{this.props.profile.displayName}</h1>
                            <div className="row justify-content-center">
                                <p className="text-white mr-4">Followers: {this.props.profile.followers}</p>
                                <p className="text-white">Follows: {this.props.profile.follows}</p>
                            </div>
                            {
                                (this.props.loggedIn && this.props.user.id !== this.state.profileId && !this.props.user.follows.includes(this.state.profileId)) &&
                                <button className="btn btn-info mb-4" onClick={() => this.props.follow(this.state.profileId)}>Follow</button>
                            }
                            {
                                (this.props.loggedIn && this.props.user.id !== this.state.profileId && this.props.user.follows.includes(this.state.profileId)) &&
                                <button className="btn btn-success mb-4" onClick={() => this.props.unfollow(this.state.profileId)}>Following</button>
                            }
                            {
                                !this.state.edit && (this.props.user.id === this.state.profileId || this.props.user.id === "901ec7ab-e12f-43a4-84f4-9a95965ae600") &&
                                <button className="btn btn-success mb-4" onClick={() => this.toggleEdit()}>Edit Profile</button>
                            }
                            {
                                this.state.edit &&
                                <div>
                                    <div className="form-group row">
                                        <label
                                            className="col-md-2 col-form-label form-control-label text-white">Email</label>
                                        <div className="col-md-4">
                                            <input className="loginInput form-control" type="text"
                                                   value={this.state.email}
                                                   onChange={this.emailChanged}/>
                                        </div>
                                        <label className="col-md-1 col-form-label form-control-label text-white">Username</label>
                                        <div className="col-md-5">
                                            <input className="loginInput form-control" type="text"
                                                   value={this.state.displayName}
                                                   onChange={this.displayNameChanged}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label form-control-label text-white">Password</label>
                                        <div className="col-md-4">
                                            <input className="loginInput form-control" type="password"
                                                   value={this.state.password}
                                                   onChange={this.displayNameChanged} placeholder="New Password"/>
                                        </div>
                                        <label
                                            className="col-md-1 col-form-label form-control-label text-white">Role</label>
                                        <div className="col-md-5">
                                            <select className="form-control" id="role"
                                                    value={this.state.role}
                                                    onChange={this.roleChanged}>
                                                <option value="LISTENER">Listener</option>
                                                <option value="CURATOR">Curator</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="button" className="mb-3 btn btn-info btn-block"
                                            onClick={() => {
                                                this.toggleEdit();
                                                this.props.updateUser(this.props.user.id,
                                                    this.state.email,
                                                    this.state.displayName,
                                                    this.state.password,
                                                    this.state.role)
                                            }}>
                                        Update
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="border-top">
                            {
                                this.props.user.role === "CURATOR" && this.props.user.id === this.state.profileId && this.props.savedPlaylists.map(playlistId =>
                                    <div key={playlistId} className="card mt-4">
                                        <iframe
                                            src={`https://open.spotify.com/embed/user/${playlistId.split("-")[0]}/playlist/${playlistId.split("-")[1]}`}
                                            width="300" height="380" frameborder="0" allowtransparency="true"
                                            allow="encrypted-media" className="w-100 playlist"></iframe>
                                        <div className="spinner-border playlist-spinner" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                this.props.user.id !== this.state.profileId && this.props.profile.playlists.map(playlistId =>
                                    <div key={playlistId} className="card mt-4">
                                        <iframe
                                            src={`https://open.spotify.com/embed/user/${playlistId.split("-")[0]}/playlist/${playlistId.split("-")[1]}`}
                                            width="300" height="380" frameborder="0" allowtransparency="true"
                                            allow="encrypted-media" className="w-100 playlist"></iframe>
                                        <div className="spinner-border playlist-spinner" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                this.props.user.role === "CURATOR" && this.props.user.id === this.state.profileId && this.props.savedPlaylists.length === 0 &&
                                <div className="card bg-dark text-black mt-4">
                                    <img className="card-img" src={window.location.origin + '/playlist.jpg'} alt="Card image"/>
                                    <div className="card-img-overlay">
                                        <h5 className="card-title">Interested in curating your own playlists?</h5>
                                        <p className="card-text">Use the search feature to find playlists to add to your curated list!</p>
                                    </div>
                                </div>
                            }
                            {
                                this.props.user.role !== "CURATOR" && this.props.user.id === this.state.profileId &&
                                <div className="card bg-dark text-black mt-4">
                                    <img className="card-img" src={window.location.origin + '/playlist.jpg'} alt="Card image"/>
                                        <div className="card-img-overlay">
                                            <h5 className="card-title">Interested in curating your own playlists?</h5>
                                            <p className="card-text">Change your role to Curator and start sharing your favorite playlists!</p>
                                        </div>
                                </div>
                            }
                            <div className="mb-4">
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

}