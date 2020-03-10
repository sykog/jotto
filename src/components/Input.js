import React, {Component} from 'react';
import {connect} from 'react-redux';
import {guessWord} from "../actions";

export class Input extends Component {

  constructor(props) {
    super(props);

    this.state = {currentGuess: ''};
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
  }

  submitGuessedWord(event) {
    event.preventDefault();
    const guessedWord = this.state.currentGuess;

    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
      this.setState({currentGuess: ''});
    }
  }

  render() {
    const contents = this.props.success || this.props.givenUp ? null
      : (
        <form className="form-inline">
          <input data-test="input-box"
                 className="mb-2 mx-sm-3"
                 type="text"
                 placeholder="Enter Guess"
                 value={this.state.currentGuess}
                 onChange={event => this.setState({currentGuess: event.target.value})}
          />
          <button data-test="submit-button"
                  className="btn btn-primary mb-2"
                  type="submit"
                  onClick={this.submitGuessedWord}>
            Submit
          </button>
        </form>
      )
    return (
      <div data-test="component-input">
        {contents}
      </div>
    );
  }
};

const mapStateToProps = ({gameStatus: {success, givenUp}}) => {
  return {success, givenUp};
};

export default connect(mapStateToProps, {guessWord})(Input);