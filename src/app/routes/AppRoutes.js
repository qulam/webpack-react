import * as React from "react";
import {Route, Switch} from "react-router-dom";

import {NotFound} from "../../components";
import {HomePage} from "../../views/Home";
import * as paths from "./paths";

export const Routes = () => {
    return (
        <Switch>
            <Route exact path={paths.baseUrl} component={HomePage}/>
            <Route path={paths.categoryUrl} component={() => <div>A</div>}/>
            <Route component={NotFound}/>
        </Switch>
    );
};