import React from 'react';
import Layout from './HoC/Layout';
import {Switch, Route} from 'react-router-dom';

import Home from './components/home/index';

const Routes = (props) => {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route exact component={Home} path='/'/>
                </Switch>
            </Layout>
        </div>
    )
};

export default Routes;
