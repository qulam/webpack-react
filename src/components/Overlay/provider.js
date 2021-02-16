import React, {useState, useEffect} from "react";
import {withRouter} from "react-router";

import {OverlayContext, OverlayType} from "./context";

const Provider = (props) => {
    console.log("Provider Props", props);
    const notificationCloseDelay = 2500;
    const [state, setState] = useState({
        context: null,
        hide,
        show,
        theme: null,
        type: null,
    });
    useEffect(() => {
        if (state.type !== OverlayType.message) {
            hide();
        }
    }, [props.location.pathname]);

    const show = (type, theme, context) => {
        setState({
            ...state,
            type,
            theme,
            context
        });
        document.body.style.overflow = type !== OverlayType.message ? "hidden" : "";
        if (type === OverlayType.message) {
            setTimeout(hide, notificationCloseDelay);
        }
    };

    const hide = () => {
        setState({...state, type: null});
        document.body.style.overflow = "";
    };

    return (
        <OverlayContext.Provider value={state}>
            {props.children}
        </OverlayContext.Provider>
    )
};

export default withRouter(Provider);