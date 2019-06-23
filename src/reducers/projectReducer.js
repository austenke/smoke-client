const projectReducer = (state={
    user: {}, profile: {}, profileLoaded: false, displayName: "", loggedIn: false, loading: true,
    playlists: [], savedPlaylists: [], exploreCards: []}, action) => {
    switch (action.type) {
        case 'LOADING_COMPLETE':
            console.log("Loading complete");
            return {
                ...state,
                loading: false
            };
        case 'LOADING':
            console.log("Loading");
            return {
                ...state,
                loading: true
            };
        case 'LOG_IN':
            console.log("Logging in user");
            console.log(action.user);
            return {
                ...state,
                loggedIn: true,
                user: action.user,
                displayName: action.user.displayName
            };
        case 'LOG_OUT':
            console.log("Logging out");
            return {
                ...state,
                loggedIn: false,
                user: {},
                displayName: ""
            };
        case 'SET_FOLLOWS':
            console.log("Setting follows");
            console.log(action.follows);
            return {
                ...state,
                user: {
                    ...state.user,
                    follows: action.follows
                }
            };
        case 'HIDE_PROFILE':
            console.log("Hiding profile");
            return {
                ...state,
                profileLoaded: false
            };
        case 'LOAD_PROFILE':
            console.log("Loading profile");
            console.log(action.profile);
            return {
                ...state,
                profile: action.profile,
                profileLoaded: true
            };
        case 'SEARCH_PLAYLISTS':
            console.log("Searching playlists");
            console.log(action.playlists);
            return {
                ...state,
                playlists: action.playlists.playlists.items
            };
        case 'SET_PLAYLISTS':
            console.log("Setting playlists");
            console.log(action.playlists);
            return {
                ...state,
                savedPlaylists: action.playlists
            };
        case 'SET_EXPLORE':
            console.log("Setting explore");
            console.log(action.explore);
            return {
                ...state,
                exploreCards: action.explore
            };
        case 'SET_EXPLORE_ANON':
            console.log("Setting explore anon");
            return {
                ...state,
                exploreCards: [
                    {
                        displayName: "buster",
                        id: "1cbe7ee7-1553-4780-ac72-277cc437cf96",
                        playlistId: "spotify-37i9dQZF1DX70RN3TfWWJh"
                    }
                ]
            };
        default:
            return state;
    }
};

export default projectReducer