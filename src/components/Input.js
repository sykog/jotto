import React, {Component} from 'react';
import {connect} from 'react-redux';
import {guessWord} from "../actions";

export class Input extends Component {

  constructor(props) {
    super(props);

    this.state = {currentGuess: null};
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
  }

  submitGuessedWord(event) {
    event.preventDefault();
    const guessedWord = this.state.currentGuess;

    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
    }
  }

  render() {
    const contents = this.props.success ? null
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
                  onClick={event => this.submitGuessedWord(event)}>
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

const mapStateToProps = ({success}) => {
  return {success};
};

export default connect(mapStateToProps, {guessWord})(Input);