import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users/Users';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import Authenticate from './user/pages/Authenticate/Authenticate';

import { AuthContext } from './shared/context/AuthContext';

const USER_DATA_KEY = 'userData';
let logoutTimer;

const App = () => {
  const [ token, setToken] = useState(null);
  const [ tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const [ userId, setUserId] = useState(null);

  const login = useCallback((id, token, expiresIn) => {
    setToken(token);
    setUserId(id);
    const oneHourFromNow = new Date().getTime() + (1000 * 60 * 60);
    const expirationDate = expiresIn || new Date(oneHourFromNow); // token expiration date
    setTokenExpirationDate(expirationDate);
    localStorage.setItem(USER_DATA_KEY,
      JSON.stringify({
        userId: id,
        token: token,
        expiration: expirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem(USER_DATA_KEY);
  }, []);

  // Register an effect to run on mount. Check if we have userData stored.
  useEffect(() => {
    const stringifiedData = localStorage.getItem(USER_DATA_KEY);
    const parsedData = JSON.parse(stringifiedData);
    const timeNow = new Date().getTime();
    let isStoredTokenValid = !!parsedData && !!parsedData.token && !!parsedData.expiration ? 
    timeNow < new Date(parsedData.expiration).getTime() : false;
    // login if stored token is valid
    if (isStoredTokenValid) {
      login(parsedData.userId, parsedData.token, new Date(parsedData.expiration));
    }
  }, [login]);

  // Register an effect to auto logout user when token expires.
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  /* Have different routes available based on auth state.*/
  let routes;
  if (token) { // if token exists, user is logged in
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users/>
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces/>
        </Route>
        <Route path="/places/new" exact>
          <NewPlace/>
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace/>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users/>
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces/>
        </Route>
        <Route path="/auth">
          <Authenticate/>
        </Route>
        <Redirect to="/auth"/>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout}}>
      <Router>
        <MainNavigation/>
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
