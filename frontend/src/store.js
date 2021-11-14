import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./context/reducers/userReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({
  user: userReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
