export function setCurrentVideo(videoId, $video) {
  return {type: "SET_CURRENT_VIDEO", videoId, $video}
}

export function startRecording(videoId = null, $video = null) {
  return (dispatch) => {
    dispatch(clearVideos());
    dispatch({type: "START_RECORDING", videoId, $video});
  }
}

export function stopRecording() {
  return {type: "STOP_RECORDING"}
}

export function changeTitle(title) {
  return {type: "CHANGE_TITLE", title};
}

export function clearVideos() {
  return {type: "CLEAR_VIDEOS"};
}
