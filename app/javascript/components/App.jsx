import React from 'react'
import {Provider} from "react-redux"
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";

import store from "../store";

import ClipNew from "../views/clips/New";
import DashboardIndex from "../views/dashboard/Index";
import NotFound from "../views/public/NotFound";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={ClipNew}/>
              <Route exact path="/dashboard" component={DashboardIndex}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
