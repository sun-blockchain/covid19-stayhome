import { combineReducers } from 'redux';
import ThreeBoxReducer from './ThreeBoxReducer';
import UIReducer from './UIReducer';

const rootReducer = combineReducers({
  threebox: ThreeBoxReducer,
  UI: UIReducer
});

export default rootReducer;
