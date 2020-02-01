// importing modules
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// importing components
import Dashboard from '../components/Dashboard/Dashboard';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>   
                <Route path="/" component={Dashboard} exact={true} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;