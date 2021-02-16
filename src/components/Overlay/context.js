import React from "react";

export const OverlayType = {
    cart: "cart",
    checkout: "checkout",
    login: "login",
    message: "message",
    sideNav: "side-nav",
    password: "password",
    search: "search",
    mainMenuNav: "main-menu-nav",
    modal: "modal",
    register: "register",
};

export const OverlayContext = React.createContext({
    context: null,
    hide: () => {
    },
    show: type => {
    },
    theme: null,
    type: null
});