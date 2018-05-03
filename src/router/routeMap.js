import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {cookie} from 'utils';

import App from '../containers/App';
import LoginWrapper from '../containers/Login';
import Login from '../containers/Login/components/Login';
import Register from '../containers/Login/components/Register';
import Guest from '../containers/Login/components/Guest';
import Home from '../containers/Home';
import ChatRoom from '../containers/ChatRoom';
import Profile from '../containers/Profile';
import Test from '../containers/test';
import store from '../store';

const {getToken} = cookie;

class RouterMap extends React.Component {

    render() {

        return (
            <Router history={this.props.history}>
                <Route component={App}>
                    <Route path="/test" component={Test}/>
                    <Route path="/" component={Home}
                           onEnter={(nextState, replace) => {
                               const identity = store.getState().userInfo.identity;
                               if (identity !== 1) {
                                   if (!getToken()) {
                                       replace({pathname: '/login'});
                                   }
                               }
                           }}>
                        <IndexRoute component={ChatRoom}/>
                        <Route path="private/:uid" component={ChatRoom}/>
                        <Route path="profile" component={Profile}/>
                    </Route>
                    <Route path="login" component={LoginWrapper}
                           onEnter={(nextState, replace) => {
                               if (getToken()) {
                                   replace({pathname: '/'});
                               }
                           }}>
                        <IndexRoute component={Login}/>
                        <Route path="register" component={Register}/>
                        <Route path="guest" component={Guest}/>
                    </Route>
                    {/*其他重定向到 404*/}
                    {/*<Redirect from='*' to='/404'/>*/}
                </Route>
            </Router>
        );
    }
}

export default RouterMap;
