import React from 'react';
import {Routes} from "./routes";
import "../assets/styles/global/global.scss";
import {withRouter} from "react-router";

const App = (props) => {
    console.log("App props =>>", props);
    return (
        <>
            <Routes/>
        </>
    )
};

export default withRouter(App);