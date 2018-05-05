import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import muiTheme from './config/theme';
import Layout from './components/Layout';
import Routes from './Routes';
import store from './redux/store';
import { ApolloProvider } from 'react-apollo';
import client from './config/apolloClient';
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
                        <Routes />
                    </Layout>
                </Router>
            </Provider>
        </ApolloProvider>
    </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
