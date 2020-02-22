import React, { Component } from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
class App extends Component {
  state = { lat: null, error: null };
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({
          lat: position.coords.latitude,
          error: null
        }),
      err =>
        this.setState({
          lat: null,
          error: err.message
        })
    );
  }
  renderContent() {
    if (this.state.lat && !this.state.error) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    if (!this.state.lat && this.state.error) {
      return <div> Error : {this.state.error}</div>;
    }
    return <Spinner message="Please allow to get a location" />;
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
