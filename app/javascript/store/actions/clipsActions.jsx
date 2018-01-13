import axios from "axios";
import {clearVideos} from "./videosActions";

export function createClip(clip) {
  return (dispatch) => {
    axios.post(Routes.api_v1_clips_path(), {clip})
      .then((response) => {
        dispatch({type: "CREATE_CLIP_FULFILLED", clip: response.data});
        dispatch(clearVideos());
      })
  }
}
