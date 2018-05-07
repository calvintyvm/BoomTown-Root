import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import PrivateRoute from './components/PrivateRoute';
import muiTheme from './config/theme';
import Login from './containers/Login';
import Items from './containers/Items';
import Profile from './containers/Profile';
import Share from './containers/Share';
import Layout from './components/Layout';
import store from './redux/store';
import { ApolloProvider } from 'react-apollo';
import client from './config/apolloClient';
// import * as Firebase from 'firebase';
import { firebaseAuth } from './config/firebaseConfig';
import { updateAuthState, userLoading } from './redux/modules/auth';

let gotProfile = false;
store.subscribe(() => {
    const values = store.getState();
    console.log(values);
    if (!values.auth.authenticated !== 'LOADING_USER' && !gotProfile) {
        gotProfile = true;
        store.dispatch(userLoading(true));
    }
});

firebaseAuth.onAuthStateChanged(user => {
    console.log('checking for user...');
    if (user) {
        console.log('working');
        store.dispatch(updateAuthState(true));
    } else {
        console.log('not working');
        store.dispatch(updateAuthState(true));
    }
});
// import * as Firebase from 'firebase';
// get login and logout working
//
// make auth redux
// this is wtaching if theres a firebase token if it gets removed then it will callback, also if item is added
// Firebase.Auth.onAuthStateChanged(user => {
//     if (user) {
//         store.dispatch(updateAuthState(user));
//     } else {
//         store.dispatch(updateAuthState(false));
//     }
// });

// mutation for borrowing

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute exact path="/" component={Items} />
                            <PrivateRoute
                                exact
                                path="/share"
                                component={Share}
                            />
                            <PrivateRoute
                                exact
                                path="/profile/:id"
                                component={Profile}
                            />
                        </Switch>
                    </Layout>
                </Router>
            </Provider>
        </ApolloProvider>
    </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
