import React from 'react';
import Layout from './HoC/Layout';
import { Switch } from 'react-router-dom';

import PrivateRoute from './components/auth_routes/privateRoutes';
import PublicRoute from './components/auth_routes/publicRoutes';

import Home from './components/home';
import SignIn from './components/signin';

import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches/index';
import AddEditMatch from './components/admin/matches/addEditMatch';
import AdminPlayers from './components/admin/players';
import AddEditPlayer from './components/admin/players/addEditPlayer';

const Routes = (props) => {

    console.log(props);
    return (
        <div>
            <Layout>
                <Switch>
                    <PrivateRoute {...props} path='/dashboard' exact component={Dashboard} />
                    <PrivateRoute {...props} path='/admin_matches' exact component={AdminMatches} />
                    <PrivateRoute {...props} path='/admin_matches/edit_match/:id' exact component={AddEditMatch} />
                    <PrivateRoute {...props} path='/admin_matches/add_match/' exact component={AddEditMatch} />
                    <PrivateRoute {...props} path='/admin_players/' exact component={AdminPlayers} />
                    <PrivateRoute {...props} path='/admin_players/edit_player/:id' exact component={AddEditPlayer} />
                    <PrivateRoute {...props} path='/admin_players/edit_player/' exact component={AddEditPlayer} />
                    <PublicRoute {...props} restricted={false} path='/' exact component={Home} />
                    <PublicRoute {...props} restricted={true} path='/sign_in' exact component={SignIn} />
                </Switch>
            </Layout>
        </div>
    )
};

export default Routes;
