import { put, takeLatest, call } from 'redux-saga/effects';
import dataService from '../services/dataService';
import * as userTypes from '../actionTypes/Users';
import * as userActions from '../actions/Users';
import toastService from '../services/toastService';


function* doGetUsers(obj) {
    try {
        const users = yield call(dataService.get, obj.data.url);
        yield put(userActions.doGetUsersSuccess(users));
    }
    catch(error) {
        yield put(userActions.doGetUsersFail(error));
    }
}

function* doDeleteUser(obj) {
    try {
        const user = yield call(dataService.delete, obj.data.url);
        yield put(userActions.doDeleteUserSuccess(user));
        toastService.successToast('Deleted Successfully');
    }
    catch(error) {
        yield put(userActions.doDeleteUserFail(error));
        toastService.errorToast('Delete Failed');
    }
}

export default function* rootPostSaga() {
    yield takeLatest(userTypes.DO_GET_USER, doGetUsers)
    yield takeLatest(userTypes.DO_DELETE_USER, doDeleteUser)
}