import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, switchMap, catchError } from 'rxjs/operators';
import { FETCH_SERVICES_REQUEST } from '../actions/actionTypes';
import { fetchServiceFailure, fetchServiceSuccess, changeServiceInit } from '../actions/actionCreators';
import { of } from 'rxjs';

export const changeSearchEpic = action$ => action$.pipe(
  ofType(FETCH_SERVICES_REQUEST),
  map(o => o.payload.id ? `/${o.payload.id}` : ''), 
  switchMap(o => ajax.getJSON(`${process.env.REACT_APP_LOCAL_URL}${o}`).pipe(
    map(items => Array.isArray(items) ? fetchServiceSuccess(items) : changeServiceInit(items)),
    catchError(e => of(fetchServiceFailure(e))),
  )),
);