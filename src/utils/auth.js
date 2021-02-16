import {ApolloClient} from "@apollo/client";
import {ApolloLink} from "apollo-link";
import {setContext} from "@apollo/client/link/context";
import {ErrorResponse, onError} from "apollo-link-error";

export const authEvent = new Event("auth");

export function getAuthToken() {
    try {
        return localStorage.getItem('token');
    } catch (e) {
        return null;
    }
};

export function setAuthToken(token) {
    localStorage.setItem("token", token);
    dispatchEvent(authEvent);
}

export function removeAuthToken() {
    localStorage.removeItem("token");
    dispatchEvent(authEvent);
};

export function clearStorage() {
    localStorage.clear();
    dispatchEvent(authEvent);
};

export function fireSignOut(client) {
    clearStorage();
    if (navigator.credentials && navigator.credentials.preventSilentAccess) {
        navigator.credentials.preventSilentAccess();
    }

    if (client) {
        client.resetStore();
    }
};

export const invalidTokenLinkWithTokenHandler = (tokenExpirationCallback) => {
    const link = onError((error) => {
        const isTokenExpired = error.graphQLErrors.some(
            error => error.extensions?.extensions?.code === "JSONWebTokenExpired"
        );

        if (
            isTokenExpired ||
            (error.networkError && error.networkError.statusCode === 401)
        ) {
            tokenExpirationCallback();
        }
    });
    return {link};
};

export const authLink = setContext((_, context) => {
    const authToken = getAuthToken();
    if (authToken) {
        return {
            ...context,
            headers: {
                ...context.headers,
                Authorization: authToken ? `JWT ${authToken}` : null
            }
        }
    } else {
        return context;
    }
});