import "./scss/index.scss";

import classNames from "classnames";
import React from "react";

const Overlay = ({children, className, context: {type, theme, hide}}) => (
    <div  className={classNames("overlay", {
        [`overlay--${type}`]: !!type,
        [className]: !!className,
    })}
          onClick={hide}>
        <div className={`overlay__${theme}`} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
);

export default Overlay;