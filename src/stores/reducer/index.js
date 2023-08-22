import { combineReducers } from "redux";
import userReducer from "./user";

export const allReducers = combineReducers({
    userReducer,
});