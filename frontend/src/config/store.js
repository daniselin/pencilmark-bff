import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';


export const history = createBrowserHistory();

function configureStore(data) {
    const router = routerMiddleware(history);
    const saga = createSagaMiddleware();
    const middleware = [router, saga];

    const store = createStore(
        createRootReducer(history),
        data,
        composeWithDevTools(
            applyMiddleware(...middleware)
        )
    );

    saga.run(rootSaga)
}

export default configureStore;