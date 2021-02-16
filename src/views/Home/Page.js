import React from "react";
import styles from "./scss/index.scss";
import classNames from 'classnames/bind';
import {Link} from "react-router-dom";

const cx = classNames.bind(styles);

const Page = (props) => {
    console.log("=>>aaa", props);
    return (
        <div className={cx("app-page")}>
            <h1 className={cx("app-page__header")}>Welcome To Motherkids.az</h1>
            <Link to={'/category/asas/1/'}>Category</Link>
            <Link to={'/as'}>To 404</Link>
        </div>
    )
};

export default Page;