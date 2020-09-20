import React, { useEffect, useState } from 'react';
import Login from './app/screens/Login';
import Welcome from './app/screens/Welcome';
import Register from './app/screens/Register';
import Home from './app/screens/Home';
import { Router, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import requestHandler from './app/utils/requestHandler';
import { createStore } from 'redux';
import reducers from './app/store/reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    requestHandler({action: 'authorize'})
      .then(res => {setIsLoggedIn(true); Actions.home();})
      .catch(err => {setIsLoggedIn(false); Actions.welcome();})
  }, [])

  if(isLoggedIn === null) return null;

  return (
    <Provider store={store}>
      <Router>
        <Scene key="root">
          <Scene key="welcome" component={Welcome} title="Welcome" initial={true} hideNavBar={true} />
          <Scene key="login" component={Login} title="Login" hideNavBar={true} />
          <Scene key="register" component={Register} title="Register" hideNavBar={true} />
          <Scene key="home" component={Home} title="Home" hideNavBar={true} />
        </Scene>
      </Router>
    </Provider>
  );
}