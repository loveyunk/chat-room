import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {cookie} from 'utils';

import App from '../containers/App';
import LoginWrapper from '../containers/Login';
import Login from '../containers/Login/components/Login';
import Register from '../containers/Login/components/Register';
import Guest from '../containers/Login/components/Guest';
import ChatRoom from '../containers/ChatRoom';
import Message from '../containers/Message';
import Profile from '../containers/Profile';

const {getToken} = cookie;

class RouterMap extends React.Component {
    render() {

        return (
            <Router history={this.props.history}>
                <Route component={App}>
                    <Route path="/" component={ChatRoom}
                           onEnter={(nextState, replace) => {
                               if (!getToken()) {
                                   replace({pathname: '/user/login'});
                               }
                           }}>
                        <IndexRoute component={Message}/>
                        <Route path="profile" component={Profile}/>
                    </Route>
                    <Route path="login" component={LoginWrapper}>
                        <IndexRoute component={Login}/>
                        <Route path="register" component={Register}/>
                        <Route path="guest" component={Guest}/>
                    </Route>
                    {/* 其他重定向到 404 */}
                    {/*<Redirect from='*' to='/404'/>*/}
                </Route>
            </Router>
        );
    }
}

export default RouterMap;
