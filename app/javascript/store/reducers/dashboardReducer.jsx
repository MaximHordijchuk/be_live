import {extend, reject} from "lodash";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case "FETCH_DASHBOARD_FULFILLED": {
      return extend({}, state, action.dashboard);
    }

    case "CLIP_DELETED": {
      return extend({}, state, {
        clips: reject(state.clips, {id: action.id})
      });
    }
  }
  return state;
}
