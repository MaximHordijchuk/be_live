import React from "react";

class ApplicationLayout extends React.Component {
  componentDidMount() {
    // Scroll to the top after page change
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="container">
        {this.props.children}
      </main>
    )
  }
}

export default ApplicationLayout;
