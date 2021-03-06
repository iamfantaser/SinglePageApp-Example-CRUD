import { createStore, applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    console.log(rootReducer);
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    );
}