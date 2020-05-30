import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SideBar from "../layout/SideBar";
import Dashboard from "../dashboard/Dashboard";

import PrivateRoute from "../routing/PrivateRoute";
import Navbar from "../layout/Navbars";
import NotFound from "../layout/NotFound"
import Swal from "../layout/Swal"
import Profile from "../profile/Profile"


import Members from "../member/Members"

import Buoys from "../buoy/Buoys";
import EcoSys from '../buoy/EcoSys'
import Vendings from "../vending/Vendings";
import Mapp from "../vending/Mapp";
import { Politic } from "../layout/Politic";



const Routes = () => {
    return (
        <Fragment>
            <div className="show">
            <Navbar />
            <SideBar />
            <Switch>
                <Redirect exact from="/" to="/dashboard" />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/profile" component={Profile} />
                
                <PrivateRoute exact path="/vendings" component={Vendings} />



                <PrivateRoute exact path="/map" component={Mapp} />
                
               
                <PrivateRoute exact path="/politic" component={Politicc} />
                
                <Route component={NotFound} />
            </Switch>
            <Swal/>
            </div>
        </Fragment>
    );
};

export default Routes;
