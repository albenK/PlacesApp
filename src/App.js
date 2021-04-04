import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import Authenticate from './user/pages/Authenticate/Authenticate';


const App = () => {
  return (
    <Router>
      <MainNavigation/>
      <main>
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
          <Route path="/auth">
            <Authenticate/>
          </Route>
          <Redirect to="/"/>
        </Switch>
      </main>
    </Router>
    
  );
}

export default App;
