import {ApolloClient} from "@apollo/client";
import {ApolloLink} from "apollo-link";
import {BatchHttpLink} from "@apollo/client/link/batch-http";
import {RetryLink} from "@apollo/client/link/retry";

const getLink = (apiUrl, invalidTokenLink, authLink) =>
    ApolloLink.from([
        invalidTokenLink,
        authLink,
        new RetryLink(),
        new BatchHttpLink({uri: apiUrl}),
    ]);


export const createRootClient = (
    apiUrl,
    invalidTokenLink,
    authLink,
    cache,
) =>
    new ApolloClient({
        cache,
        link: getLink(apiUrl, invalidTokenLink, authLink),
    });