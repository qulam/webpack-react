import React from "react";
import styles from "./scss/index.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({
        className = "",
        children,
        secondary,
        btnRef,
        type,
        ...otherProps
    }) => {
    return (
        <button
            className={`button ${secondary ? "secondary" : ""} ${className}`}
            ref={btnRef}
            type={type}
            {...otherProps}
        >
            <span>{children}</span>
        </button>
    )
};

export default Button;