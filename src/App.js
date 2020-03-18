import React, { Component } from "react";
import { connect } from "react-redux";
import { chooseSecretWord } from "./actions";
import GuessedWords from "./components/GuessedWords";
import Congrats from "./components/Congrats";
import Input from "./components/Input";
import ResetGame from "./components/ResetGame";
import "./App.css";
import GiveUp from "./components/GiveUp";

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.chooseSecretWord();
  }

  render() {
    const serverError =
      typeof this.props.secretWord == "object" ? (
        <p className="alert alert-danger" data-test="error-message">
          Error: Could not connect to the server
        </p>
      ) : null;
    //console.log(this.props.secretWord);
    return (
      <div className="container">
        <h1>Jotto</h1>
        <ResetGame />
        <GiveUp />
        {serverError}
        <Congrats success={this.props.gameStatus.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { gameStatus, guessedWords, secretWord } = state;
  return { gameStatus, guessedWords, secretWord };
};

export default connect(mapStateToProps, { chooseSecretWord })(UnconnectedApp);
