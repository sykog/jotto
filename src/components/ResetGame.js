import React, { Component } from "react";
import { connect } from "react-redux";
import { resetGame } from "../actions";

export class ResetGame extends Component {
  constructor(props) {
    super(props);
    this.state = { resetting: false, secretWord: "", errorMessage: false };
    this.resetGameFromUser = this.resetGameFromUser.bind(this);
    this.resetGameFromServer = this.resetGameFromServer.bind(this);
  }

  resetGameFromUser(event) {
    if (new RegExp("^[a-zA-Z]{5}$").test(this.state.secretWord)) {
      this.props.resetGame(this.state.secretWord);
      this.setState({
        ...this.state,
        resetting: false,
        secretWord: "",
        errorMessage: false
      });
    } else {
      this.setState({ ...this.state, errorMessage: true });
    }
  }

  resetGameFromServer(event) {
    event.preventDefault();
    this.props.resetGame();
    this.setState({ ...this.state, resetting: false, errorMessage: false });
  }

  render() {
    const errorMessage = this.state.errorMessage ? (
      <p className="alert alert-danger" data-test="error-message">
        Word must be 5 letters (letters only)
      </p>
    ) : null;

    const resetOptions = this.state.resetting ? (
      <React.Fragment>
        {errorMessage}
        <div className="row mb-2">
          <button
            data-test="reset-server"
            className="btn btn-primary"
            type="text"
            onClick={this.resetGameFromServer}
          >
            Random Word
          </button>

          <input
            data-test="secret-word-input"
            className="mx-sm-3"
            type="text"
            placeholder="Enter Secret Word"
            value={this.state.secretWord}
            onChange={event =>
              this.setState({ secretWord: event.target.value })
            }
          />
          <button
            data-test="reset-user"
            className="btn btn-primary"
            type="text"
            onClick={this.resetGameFromUser}
          >
            Submit Word
          </button>

          <button
            data-test="reset-game-cancel"
            className="btn btn-warning mx-2"
            type="text"
            onClick={event => {
              this.setState({ ...this.state, resetting: false });
            }}
          >
            Cancel
          </button>
        </div>
      </React.Fragment>
    ) : (
      <button
        data-test="reset-game-button"
        className="btn btn-primary mb-2"
        type="text"
        onClick={event => {
          this.setState({ ...this.state, resetting: true });
        }}
      >
        Reset Game
      </button>
    );

    return <div data-test="component-reset-game">{resetOptions}</div>;
  }
}

export default connect(null, { resetGame })(ResetGame);
