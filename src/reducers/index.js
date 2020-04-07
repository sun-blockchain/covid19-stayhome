import { combineReducers } from 'redux';
import ThreeBoxReducer from './ThreeBoxReducer';

const rootReducer = combineReducers({
  threebox: ThreeBoxReducer
});

export default rootReducer;
