import React from "react";
import {getAuthToken} from "../utils/auth";

const useAuth = (stateChangeCallback) => {
    const [authenticated, setAuthenticated] = React.useState(!!getAuthToken());
    const eventHandler = () => {
        const newState = !!getAuthToken();

        if (stateChangeCallback && authenticated !== newState) {
            stateChangeCallback(newState);
        }

        setAuthenticated(newState);
    };

    React.useEffect(() => {
        addEventListener("auth", eventHandler);

        return () => {
            removeEventListener("auth", eventHandler);
        }
    }, [authenticated]);

    return {authenticated};
};

export default useAuth;