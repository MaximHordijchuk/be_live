import {applyMiddleware, createStore} from "redux";

import thunk from "redux-thunk";

import reducer from "store/reducers";

const middleware = applyMiddleware(thunk);

export default createStore(
  reducer,
  // Redux extension for Google Chrome
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware
);
