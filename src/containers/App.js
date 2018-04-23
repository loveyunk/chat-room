import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";
import CssBaseline from 'material-ui/CssBaseline';

import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import {bindActionCreators} from 'redux';
import {cookie} from 'utils';

import Login from './Login';
import ChatRoom from './ChatRoom';

const {getToken} = cookie;

class App extends React.Component {
    render() {

        // const renderDom = getToken() ? <ChatRoom/> : <Login {...this.props}/>;

        return (
            <React.Fragment>
                <CssBaseline/>
                {/*{renderDom}*/}
                <Router>
                    <div>
                        <Route path="/login"
                               render={() =>
                                   getToken() ? (
                                       <Redirect
                                           to={{
                                               pathname: "/chatroom"
                                           }}
                                       />
                                   ) : (
                                       <Login/>
                                   )
                               }/>
                        <Route path="/chatroom"
                               render={() =>
                                   getToken() ? (
                                       <ChatRoom/>
                                   ) : (
                                       <Redirect
                                           to={{
                                               pathname: "/login"
                                           }}
                                       />
                                   )
                               }/>
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.username,
        socket: state.userInfo.socket
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
