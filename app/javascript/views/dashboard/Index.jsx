import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {isEmpty, map} from "lodash";

import {fetchDashboard} from "../../store/actions/dashboardActions";
import ApplicationLayout from "../layouts/ApplicationLayout";
import {deleteClip} from "../../store/actions/dashboardActions";

class Index extends React.Component {
  componentDidMount() {
    this.props.fetchDashboard();
  }

  render() {
    const {dashboard} = this.props;

    if (isEmpty(dashboard)) return null;

    return (
      <ApplicationLayout>
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col-md-5 col-sm-6">
            <table className="table">
              <tbody>
                <tr>
                  <td>Recordings count</td>
                  <td>{dashboard.clips.length}</td>
                </tr>
                <tr>
                  <td>Distribution</td>
                  <td>
                    <ul>
                      {map(dashboard.distribution, (video_distribution) => (
                        <li key={video_distribution.video_id}>
                          Video{video_distribution.video_id} {video_distribution.percentage.toFixed(2)}%
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>Average rate</td>
                  <td>{dashboard.avg_rate.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <h3>Clips</h3>
            <ul className="dashboard-clip-list">
              {map(dashboard.clips, (clip) => (
                <li key={clip.id}>
                  {clip.title}
                  <button className="btn btn-default" onClick={() => this.props.deleteClip(clip.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ApplicationLayout>
    )
  }
}

Index.propTypes = {
  dashboard: PropTypes.object.isRequired,
  fetchDashboard: PropTypes.func.isRequired,
  deleteClip: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard
  }
}

export default connect(mapStateToProps, {fetchDashboard, deleteClip})(Index);
