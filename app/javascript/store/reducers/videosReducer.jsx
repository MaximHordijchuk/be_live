import {cloneDeep, extend, concat, last} from 'lodash';

const DEFAULT_STATE = {
  current: {},
  previous: {},
  isRecording: false,
  timestamps: [],
  lastOffsetTime: null,
  title: ""
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case "SET_CURRENT_VIDEO": {
      let timestamps;
      const timePlaying = new Date().getTime() - state.lastOffsetTime;

      const lastTimestamp = last(state.timestamps);
      if (lastTimestamp) {
        timestamps = concat(state.timestamps, [{videoId: action.videoId, offset: lastTimestamp.offset + timePlaying}]);
      } else {
        timestamps = [{videoId: action.videoId, offset: timePlaying}];
      }

      return extend({}, state, {
        current: {
          videoId: action.videoId,
          $video: action.$video
        },
        previous: state.current,
        lastOffsetTime: new Date().getTime(),
        timestamps
      });
    }

    case "START_RECORDING": {
      let timestamps = [];
      let current = {};
      if (action.videoId > 0 && action.$video) {
        timestamps.push({videoId: action.videoId, offset: 0});
        current = {
          videoId: action.videoId,
          $video: action.$video
        }
      }
      return extend({}, state, {
        isRecording: true,
        lastOffsetTime: new Date().getTime(),
        timestamps,
        current
      });
    }

    case "STOP_RECORDING": {
      return extend({}, state, {isRecording: false});
    }

    case "CHANGE_TITLE": {
      return extend({}, state, {title: action.title});
    }

    case "CLEAR_VIDEOS": {
      return DEFAULT_STATE;
    }
  }
  return state;
}
