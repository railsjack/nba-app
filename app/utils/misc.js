import AsyncStorage from '@react-native-community/async-storage';

export const FIREBASEURL = 'https://nba-app-mark.firebaseio.com';
export const APIKEY = 'AIzaSyDTsw1G6Evv7zn8LSS0oAtyWl2QKDlR19o';
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

const APP_NAME = '@nba_app21';
export const getTokens = (cb) => {
    AsyncStorage.multiGet([
        `${APP_NAME}@token`,
        `${APP_NAME}@refreshToken`,
        `${APP_NAME}@expireToken`,
        `${APP_NAME}@uid`,
    ]).then( value => {
        cb(value);
    });
};

export const setTokens = (values, cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + 3600 * 1000;
    AsyncStorage.multiSet([
        [`${APP_NAME}@token`, values.token],
        [`${APP_NAME}@refreshToken`, values.refToken],
        [`${APP_NAME}@expireToken`, expiration.toString()],
        [`${APP_NAME}@uid`, values.uid],
    ]).then( response => {
        cb();
    });
};
