import {hot} from 'react-hot-loader';

import {
    defaultDataIdFromObject,
    InMemoryCache,
    NormalizedCacheObject
} from 'apollo-cache-inmemory';

import {persistCache} from 'apollo-cache-persist'
import {ApolloClient} from '@apollo/client';

import * as React from 'react';
import {ApolloProvider} from "react-apollo";
import {OverlayProvider} from "./components";
import {render} from "react-dom";
import {Route, Router} from "react-router-dom";
import {QueryParamProvider} from "use-query-params";

import App from "./app/App";
import {apiUrl} from "./constants";
import {history} from "./history";
import {authLink, fireSignOut, invalidTokenLinkWithTokenHandler} from "./utils/auth";
import useAuth from "./hooks/useAuth";
import {createRootClient} from "./utils/client";

const cache = new InMemoryCache({
    dataIdFromObject: obj => {
        return defaultDataIdFromObject(obj);
    },
});

const startApp = async () => {
    await persistCache({
        cache,
        storage: window.localStorage
    });

    const ApolloClientInvalidTokenLinkAdapter = ({children}) => {

        const tokenExpirationCallback = () => {
            fireSignOut(apolloClient);
        };

        const {link: invalidTokenLink} = invalidTokenLinkWithTokenHandler(
            tokenExpirationCallback
        );

        const apolloClient = React.useMemo(
            () => new ApolloClient({
                cache,
                link: createRootClient(apiUrl, invalidTokenLink, authLink, cache)
            }),
            []
        );
        return children(apolloClient);
    };


    const Root = hot(module)(() => {
        const Notifications = () => {
            useAuth((authenticated) => {
                if (authenticated) {
                    alert.show(
                        {
                            title: "You are now logged in",
                        },
                        {type: "success"}
                    );
                }
                {
                    alert.show(
                        {
                            title: "You are now logged out",
                        },
                        {type: "success"}
                    );
                }
            });

            return null;
        };
        return (
            <Router history={history}>
                <QueryParamProvider ReactRouterRoute={Route}>
                    <ApolloClientInvalidTokenLinkAdapter>
                        {
                            apolloClient =>
                                apolloClient && (
                                    <ApolloProvider client={apolloClient}>
                                        <OverlayProvider>
                                            <App/>
                                            <Notifications/>
                                        </OverlayProvider>
                                    </ApolloProvider>
                                )
                        }
                    </ApolloClientInvalidTokenLinkAdapter>
                </QueryParamProvider>
            </Router>
        )
    });

    render(
        <Root/>,
        document.getElementById("root")
    );

    if (module.hot) {
        module.hot.accept();
    }
};

startApp();
