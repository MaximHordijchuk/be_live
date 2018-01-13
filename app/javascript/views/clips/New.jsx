import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {map, isEmpty, each} from "lodash";

import ApplicationLayout from "../layouts/ApplicationLayout";
import {changeTitle, setCurrentVideo, startRecording, stopRecording} from "../../store/actions/videosActions";
import {createClip} from "../../store/actions/clipsActions";

class New extends React.Component {
  componentDidMount() {
    const $body = $("body");
    $body.attr("tabindex", "1");
    $body.focus();
    $body.bind("keypress", (event) => {
      if ($(this.titleInput).is(':focus')) {
        return;
      }

      if (49 <= event.which && event.which <= 51) {
        this.recordVideo(event.which - 48);
      }
    });
  }

  recordVideo = (videoId) => {
    const {videos} = this.props;

    this.hideVideo(videos.current.$video);

    const $newVideo = this.createVideo(videoId);

    if (!videos.isRecording) {
      this.toggleRecording(videoId, $newVideo);
    } else {
      this.props.setCurrentVideo(videoId, $newVideo);
    }

    $(this.videoContainer).append($newVideo);
    $newVideo[0].play();
  };

  hideVideo = ($video) => {
    if ($video) {
      $video.addClass("hide");
      if ($video[0].ended) {
        $video.remove();
      } else {
        $video.on("ended", (event) => {
          $(event.target).remove();
        })
      }
    }
  };

  createVideo = (videoId) => {
    return $("<video/>", {
      src: `https://d15t3vksqnhdeh.cloudfront.net/videos/${videoId}.mp4`,
      width: "100%"
    });
  };

  toggleRecording = (videoId, $video) => {
    if (this.props.videos.isRecording) {
      this.props.stopRecording();
    } else {
      this.props.startRecording(videoId, $video);
      this.clearVideoContainer();
    }
  };

  clearVideoContainer = () => {
    $(this.videoContainer).empty();
  };

  saveClip = (e) => {
    e.preventDefault();

    const {videos} = this.props;

    if (!videos.title) return;

    let clip = {};
    clip.title = videos.title;
    clip.timestamps_attributes = map(videos.timestamps, (timestamp) => {
      return {video_id: timestamp.videoId, offset: timestamp.offset / 1000.0};
    });

    this.props.createClip(clip);
  };

  playClip = (clip) => {
    this.clearVideoContainer();
    let $video = null;
    each(clip.timestamps, (timestamp) => {
      setTimeout(() => {
        this.hideVideo($video);

        $video = this.createVideo(timestamp.video_id);
        $(this.videoContainer).append($video);
        $video[0].play();
      }, timestamp.offset * 1000);
    });
  };

  render() {
    const {clips, videos} = this.props;
    const isShowSave = !videos.isRecording && !isEmpty(videos.timestamps);
    const {isRecording} = videos;

    return (
      <ApplicationLayout>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="video-wrapper">
              <div
                className="video"
                ref={(videoContainer) => this.videoContainer = videoContainer}
              />
            </div>
            <div className="video-controls">
              {map([1, 2, 3], (videoId) => (
                <button key={videoId} className="btn btn-default" onClick={() => this.recordVideo(videoId)}>
                  {videoId}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <button className="btn btn-default rec-button" onClick={this.toggleRecording}>
              {isRecording ? "STOP" : "REC"}
            </button>
            {isShowSave &&
            <form className="clip-save">
              <input
                className="form-control"
                placeholder="Enter clip name"
                onChange={(e) => this.props.changeTitle(e.target.value)}
                value={videos.title}
                ref={(input) => this.titleInput = input}
              />
              <button type="submit" className="btn btn-default" onClick={this.saveClip}>Save</button>
            </form>
            }
            <div className="clip-list">
              {map(clips.collection, (clip) => (
                <div className="clip-line" key={clip.id}>
                  <span>{clip.title}</span>
                  <button className="btn btn-default" onClick={() => this.playClip(clip)}>Play</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ApplicationLayout>
    )
  }
}

New.propTypes = {
  clips: PropTypes.object.isRequired,
  videos: PropTypes.object.isRequired,
  setCurrentVideo: PropTypes.func.isRequired,
  startRecording: PropTypes.func.isRequired,
  stopRecording: PropTypes.func.isRequired,
  createClip: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    clips: state.clips,
    videos: state.videos
  }
}

export default connect(mapStateToProps, {
  setCurrentVideo, startRecording, stopRecording, createClip, changeTitle
})(New);
