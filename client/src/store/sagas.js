import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { REQUEST_API_DATA, receiveApiData, updateUserInfoStateAction } from "./actions";
import { fetchData, updateUserInfoApi } from "./api";
import { UPDATE_USER_INFO } from "../app/pages/login/actions";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* getApiData(action) {
//   try {
//     // do api call
//     const data = yield call(fetchData);
//     console.log('data from server--------------------------', data);
//     yield put(receiveApiData(data));
//   } catch (e) {
//     console.log(e);
//   }
// }

// function* updateUserInfo(action) {
//   try {
//     // do api call
//     console.log('Action--------------------------', action);
//     const data = yield call(updateUserInfoApi, {email: action.payload.user.user.email, name: action.payload.user.user.displayName});
//     console.log('data from server--------------------------', data);

//     yield put(updateUserInfoStateAction(data));
//   } catch (e) {
//     console.log(e);
//   }
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* mySaga() {
  // yield takeLatest(REQUEST_API_DATA, getApiData);
  // yield takeLatest(UPDATE_USER_INFO, updateUserInfo);
}
