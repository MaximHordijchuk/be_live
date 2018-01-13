import axios from "axios";

export function fetchDashboard() {
  return (dispatch) => {
    axios.get(Routes.api_v1_dashboard_index_path())
      .then((response) => {
        dispatch({type: "FETCH_DASHBOARD_FULFILLED", dashboard: response.data});
      })
  }
}

export function deleteClip(id) {
  return (dispatch) => {
    axios.delete(Routes.api_v1_clip_path(id))
      .then(() => {
        dispatch(fetchDashboard());
      })
  }
}
