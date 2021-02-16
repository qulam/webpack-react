import React from "react";
import classNames from 'classnames/bind';
import styles from "./scss/index.scss";
import Page from "./Page";
const cx = classNames.bind(styles);

const View = () => (
    <div className={cx("home-page")}>
        <Page />
    </div>
);

export default View;