import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import projectReducer from '../reducers/projectReducer'
import MainContainer from "../containers/MainContainer";

const store = createStore(projectReducer);

export default class Project extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <MainContainer/>
            </Provider>
        )
    }
}