import * as actions from 'actions';

const initialState = {
  box: null,
  space: null,
  account: null,
  threeBoxProfile: null,
  leaderboard: null,
  myResult: null,
  location: null,
  error: null
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
        leaderboard: action.leaderboard,
        myResult: action.myResult,
        location: action.location,
        error: action.error
      };
    case actions.THREE_BOX_NOT_CONNECT:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
export default ThreeBoxReducer;
