import React from 'react';
import Layout from './HoC/Layout';
import {Switch} from 'react-router-dom';

import PrivateRoute from './components/auth_routes/privateRoutes';
import PublicRoute from './components/auth_routes/publicRoutes';

import Home from './components/home';
import SignIn from './components/signin';

import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches/index';

const Routes = (props) => {

    console.log(props);
    return (
        <div>
            <Layout>
                <Switch>
                    <PrivateRoute {...props} path='/dashboard' exact component={Dashboard}/>
                    <PrivateRoute {...props} path='/admin_matches' exact component={AdminMatches}/>
                    <PublicRoute {...props} restricted={false} path='/' exact component={Home}/>
                    <PublicRoute {...props} restricted={true} path='/sign_in' exact component={SignIn}/>
                </Switch>
            </Layout>
        </div>
    )
};

export default Routes;
