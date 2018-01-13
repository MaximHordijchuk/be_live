import {combineReducers} from "redux";

import clips from "./clipsReducer";
import videos from "./videosReducer";
import dashboard from "./dashboardReducer";

export default combineReducers({
  clips,
  videos,
  dashboard
})
