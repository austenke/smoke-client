class LoginService {
    static myInstance = null;

    static getInstance() {
        if (LoginService.myInstance == null) {
            LoginService.myInstance =
                new LoginService();
        }
        return this.myInstance;
    }

    getUser = () => {
        return fetch(`https://hidden-shore-64759.herokuapp.com/api/users/`, {
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Got getUser error response code " + response.status);
                return undefined;
            }
        }, err => {
            console.log("Got getUser error");
            console.log(err);
        });
    };

    getProfile = userId => {
        return fetch(`https://hidden-shore-64759.herokuapp.com/api/users/profile/${userId}`, {
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Got getProfile error response code " + response.status);
                return undefined;
            }
        }, err => {
            console.log("Got getProfile error");
            console.log(err);
        });
    };

    refreshJwt = () => {
        return fetch(`https://hidden-shore-64759.herokuapp.com/api/users/refreshJWT`, {
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Got login error response code " + response.status);
                return undefined;
            }
        }, err => {
            console.log("Got refreshJwt error");
            console.log(err);
        });
    };

    login = (email, password) => {
        return fetch(`https://hidden-shore-64759.herokuapp.com/api/users/login`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Got login error response code " + response.status);
                return undefined;
            }
        }, err => {
            console.log("Got login error");
            console.log(err);
        });
    };

    logout = () => {
        return fetch(`https://hidden-shore-64759.herokuapp.com/api/users/logout`, {
            method: 'POST',
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return true;
            } else {
                console.log("Got logout error response code " + response.status);
                return false;
            }
        }, err => {
            console.log("Got logout error");
            console.log(err);
        });
    };

    register = (email, displayName, password, role) => {
        return fetch(`https://hidden-shore-64759.herokuapp.com/api/users/createUser`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
                displayName: displayName,
                password: password,
                role: role
            }),
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Got register error response code " + response.status);
                return undefined;
            }
        }, err => {
            console.log("Got register error");
            console.log(err);
        });
    };

    updateUser = (userId, email, displayName, password, role) => {
        return fetch(`https://hidden-shore-64759.herokuapp.com/api/users/updateUser`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                id: userId,
                email: email,
                displayName: displayName,
                password: password,
                role: role
            }),
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Got updateUser error response code " + response.status);
                return undefined;
            }
        }, err => {
            console.log("Got updateUser error");
            console.log(err);
        });
    }
}
export default LoginService