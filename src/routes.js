import React from 'react';
import Layout from './HoC/Layout';
import {Switch, Route} from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';

import Dashboard from './components/admin/Dashboard';


const Routes = (props) => {

    console.log(props);
    return (
        <div>
            <Layout>
                <Switch>
                    <Route exact component={Home} path='/'/>
                    <Route exact component={SignIn} path='/sign_in'/>
                    <Route exact component={Dashboard} path='/dashboard'/>
                </Switch>
            </Layout>
        </div>
    )
};

export default Routes;
