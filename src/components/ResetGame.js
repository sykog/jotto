import React, {Component} from 'react';
import {connect} from 'react-redux'
import {resetGame} from "../actions";

export class ResetGame extends Component {

  constructor(props) {
    super(props);
    this.resetGame = this.resetGame.bind(this);
  }

  resetGame(event) {
    event.preventDefault();
    this.props.resetGame();
  }

  render() {
    return (
      <div data-test="component-reset-game">
        <button data-test="reset-game-button"
                className="btn btn-primary mb-2"
                type="text"
                onClick={this.resetGame}>
          Reset Game
        </button>
      </div>
    );
  }
}

export default connect(null,{resetGame})(ResetGame);