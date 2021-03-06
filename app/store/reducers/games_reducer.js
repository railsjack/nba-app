import {
    GET_GAMES
} from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {...state, games: action.payload};
    default:
      return state;
  }
};
