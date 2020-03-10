import React, {Component} from "react";
import {connect} from 'react-redux';
import {giveUp} from '../actions'

export class GiveUp extends Component {

  constructor(props) {
    super(props);

    this.giveUp = this.giveUp.bind(this);
  }

  giveUp(event) {
    event.preventDefault();
    this.props.giveUp();
  }

  render() {
    const tryAgainText = this.props.gameStatus.givenUp ? (
      <div data-test="try-again" className="alert alert-danger">
            <span data-test="congrats-message">
              The secret word was {this.props.secretWord}. Better luck next time!
            </span>
      </div>
    ) : null;
    const giveUpButton = this.props.gameStatus.success ? null : (
      <button data-test="give-up-button"
              className="btn btn-danger mb-2"
              type="submit"
              onClick={this.giveUp}>
        Give up
      </button>
    );

    return (
      <div data-test="component-give-up">
        {tryAgainText}
        {giveUpButton}
      </div>
    );
  }
};

const mapStateToProps = ({gameStatus, secretWord}) => {
  return {gameStatus, secretWord};
}

export default connect(mapStateToProps, {giveUp})(GiveUp);