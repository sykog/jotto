import React, {Component} from 'react';
import {connect} from 'react-redux'
import {resetGame} from "../actions";

export class ResetGame extends Component {

  constructor(props) {
    super(props);
    this.state = {resetting: false, secretWord: ''};
    this.resetGameFromUser = this.resetGameFromUser.bind(this);
    this.resetGameFromServer = this.resetGameFromServer.bind(this);
  }

  resetGameFromUser(event) {
    this.props.resetGame(this.state.secretWord);
  }

  resetGameFromServer(event) {
    event.preventDefault();
    this.props.resetGame();
    this.setState({...this.state, resetting: false});
  }

  render() {
    const resetOptions = this.state.resetting ? (
      <React.Fragment>
        <div className="row mb-2">
          <button data-test="reset-server"
                  className="btn btn-primary"
                  type="text"
                  onClick={this.resetGameFromServer}>
            Random Word
          </button>

          <form className="form-inline">
            <input data-test="secret-word-input"
                   className="mx-sm-3"
                   type="text"
                   placeholder="Enter Secret Word"
                   value={this.state.secretWord}
                   onChange={this.resetGameFromUser}
            />
            <button data-test="reset-user"
                    className="btn btn-primary"
                    type="submit"
                    onClick={this.submitGuessedWord}>
              Submit
            </button>
          </form>

          <button data-test="reset-game-cancel"
                  className="btn btn-warning mx-2"
                  type="text"
                  onClick={event => {
                    this.setState({...this.state, resetting: false});
                  }}>
            Reset Game
          </button>
        </div>
      </React.Fragment>
    ) : (
      <button data-test="reset-game-button"
              className="btn btn-primary mb-2"
              type="text"
              onClick={event => {
                this.setState({...this.state, resetting: true});
              }}>
        Reset Game
      </button>
    );

    return (
      <div data-test="component-reset-game">
        {resetOptions}
      </div>
    );
  }
}

export default connect(null, {resetGame})(ResetGame);