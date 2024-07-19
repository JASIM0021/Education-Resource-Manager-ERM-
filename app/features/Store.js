import { configureStore, combineReducers, applyMiddleware, createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import GlobalSlice from "./slice/GlobalSlice";
import globalApiSlice from "./api/globalApiSlice";
import rootSaga from "./saga/rootSaga";

const rootReducer = combineReducers({
  globalReducer: GlobalSlice,
  [globalApiSlice.reducerPath]: globalApiSlice.reducer,
});


const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga); // Running the root saga

export default store;




