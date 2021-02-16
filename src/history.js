import {createBrowserHistory} from 'history';

const history = createBrowserHistory();
history.listen(({action, location}) => {
    if (["PUSH"].includes(action)) {
        window.scroll({
            behavior: "smooth",
            top: 1000
        })
    }
});

export {history};