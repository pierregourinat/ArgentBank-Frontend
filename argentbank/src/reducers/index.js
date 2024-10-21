// CE FICHIER REGROUPE TOUS LES REDUCERS
import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
