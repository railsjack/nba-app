import AsyncStorage from '@react-native-community/async-storage';
import {FIREBASE_APIKEY} from '../config/keys';
export const FIREBASEURL = 'https://nba-app-mark.firebaseio.com';
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_APIKEY}`;
export const USERINFO = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_APIKEY}`;

const APP_NAME = '@nba_app22';
export const getTokens = cb => {
  AsyncStorage.multiGet([
    `${APP_NAME}@token`,
    `${APP_NAME}@refreshToken`,
    `${APP_NAME}@expireToken`,
    `${APP_NAME}@uid`,
  ]).then(value => {
    cb(value);
  });
};

export const isLoggedIn = async () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(`${APP_NAME}@token`)
      .then(response => resolve(response !== undefined))
      .catch(e => reject(e));
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
  ]).then(response => {
    cb();
  });
};

export const removeTokens = cb => {
  AsyncStorage.multiRemove([
    `${APP_NAME}@token`,
    `${APP_NAME}@refreshToken`,
    `${APP_NAME}@expireToken`,
    `${APP_NAME}@uid`,
  ]).then(() => {
    cb();
  });
};

export const convertFirebase = data => {
  const newData = [];
  for (let key in data) {
    newData.push({
      ...data[key],
      id: key,
    });
  }
  return newData;
};

export const findTeamData = (itemId, teams) => {
  const value = teams.find(team => {
    return team.id === itemId;
  });
  return value;
};
