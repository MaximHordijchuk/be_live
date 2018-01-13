import React from "react";
import {Link} from "react-router-dom";

import {rootPath} from "../../helpers/routesHelper";

class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1>Oops!</h1>
        <h3>Sorry, the page you are looking for is not found</h3>
        <div>
          <Link to={rootPath()}>Click here to return to the homepage</Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
