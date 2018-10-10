import * as userTypes from '../actionTypes/Users';

export const doGetUsers = (data) => {
    return {
        type: userTypes.DO_GET_USER,
        data,
    }
};

export const doGetUsersSuccess = (data) => {
    return {
        type: userTypes.DO_GET_USER_SUCCESS,
        data,
    }
};

export const doGetUsersFail = (data) => {
    return {
        type: userTypes.DO_GET_USER_FAIL,
        data,
    }
};

export const doDeleteUser = (data) => {
    return {
        type: userTypes.DO_DELETE_USER,
        data,
    }
};

export const doDeleteUserSuccess = (data) => {
    return {
        type: userTypes.DO_DELETE_USER_SUCCESS,
        data,
    }
};

export const doDeleteUserFail = (data) => {
    return {
        type: userTypes.DO_DELETE_USER_SUCCESS,
        data,
    }
};
