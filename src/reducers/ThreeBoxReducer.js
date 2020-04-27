import * as actions from 'actions';

const initialState = {
  box: null,
  space: null,
  account: null,
  threeBoxProfile: null,
  leaderboard: null,
  error: null,
  point: null,
  zone: null,
  userLocation: null,
  startTime: null,
  lastCheck: null
};

const ThreeBoxReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.THREE_BOX_CONNECT:
      return {
        ...state,
        box: action.box,
        space: action.space,
        account: action.account,
        threeBoxProfile: action.threeBoxProfile,
        error: action.error
      };
    case actions.THREE_BOX_NOT_CONNECT:
      return {
        ...state,
        error: action.error
      };
    case actions.GET_PRIVATE_SPACE:
      return {
        ...state,
        zone: action.zone
      };
    case actions.GET_PUBLIC_SPACE:
      return {
        ...state,
        startTime: action.startTime,
        point: action.point,
        lastCheck: action.lastCheck
      };
    case actions.USER_LOCATION:
      return {
        ...state,
        userLocation: action.userLocation
      };
    case actions.GET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.leaderboard
      };
    default:
      return state;
  }
};
export default ThreeBoxReducer;
