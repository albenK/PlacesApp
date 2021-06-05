import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users/Users';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import Authenticate from './user/pages/Authenticate/Authenticate';

import { AuthContext } from './shared/context/AuthContext';


const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((id, token) => {
    setToken(token);
    setUserId(id);
    localStorage.setItem('userData', JSON.stringify({ userId: id, token: token }));
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
  }, []);

  /* Have different routes available based on auth state.*/
  let routes;
  if (token) {
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
