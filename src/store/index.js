import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { changeSearchEpic, searchSkillsEpic } from '../epics';

import serviceListReducer from '../reducers/serviceListReducer';
import serviceAddReducer from '../reducers/serviceAddReducer';
import serviceChangeReducer from '../reducers/serviceChangeReducer';
import serviceIsLoadingReducer from '../reducers/serviseIsLoadingReducer.js';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceAdd: serviceAddReducer,
  serviceChange: serviceChangeReducer,
  serviceIsLoadng: serviceIsLoadingReducer,
});

const epic = combineEpics(
  changeSearchEpic,
  // searchSkillsEpic,
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(epicMiddleware)
));

epicMiddleware.run(epic);

export default store;