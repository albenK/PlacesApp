import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner/LoadingSpinner';

import { AuthContext } from './shared/context/AuthContext';
import useAuth from './shared/hooks/useAuth/useAuth';

// Lazy load below components.
const Users = React.lazy(() => import('./user/pages/Users/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace/UpdatePlace'));
const Authenticate = React.lazy(() => import('./user/pages/Authenticate/Authenticate'));

const App = () => {
  const { token, userId, login, logout } = useAuth();

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
          <Suspense
            fallback={<div className="center">
              <LoadingSpinner/>
            </div>}>
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
