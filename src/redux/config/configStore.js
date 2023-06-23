import { createStore } from "redux";
import { combineReducers } from "redux";
import calenderData from "./modules/calenderData";
import bottomTodo from "./modules/bottomTodo";

const rootReducer = combineReducers({
  calenderData,
  bottomTodo,
});
const store = createStore(rootReducer);

export default store;
