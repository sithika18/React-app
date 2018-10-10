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

export const doUpdateUserRole = (data) => {
    return {
        type: userTypes.DO_UPDATE_USER_ROLE,
        data,
    }
};

export const doUpdateUserRoleSuccess = (data) => {
    return {
        type: userTypes.DO_UPDATE_USER_ROLE_SUCCESS,
        data,
    }
};

export const doUpdateUserRoleFail = (data) => {
    return {
        type: userTypes.DO_UPDATE_USER_ROLE_FAIL,
        data,
    }
};

export const doUpdateUser = (data) => {
    return {
        type: userTypes.DO_UPDATE_USER,
        data,
    }
};

export const doUpdateUserSuccess = (data) => {
    return {
        type: userTypes.DO_UPDATE_USER_SUCCESS,
        data,
    }
};

export const doUpdateUserFail = (data) => {
    return {
        type: userTypes.DO_UPDATE_USER_FAIL,
        data,
    }
};
