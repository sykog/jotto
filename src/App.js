import React, {Component} from 'react';
import {connect} from 'react-redux';
import {chooseSecretWord} from "./actions";
import GuessedWords from "./components/GuessedWords";
import Congrats from "./components/Congrats";
import Input from './components/Input';
import ResetGame from "./components/ResetGame";
import './App.css';
import GiveUp from "./components/GiveUp";

export class UnconnectedApp extends Component {

  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <ResetGame/>
        <GiveUp />
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.gameStatus.success}/>
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {gameStatus, guessedWords, secretWord} = state;
  return {gameStatus, guessedWords, secretWord};
};

export default connect(mapStateToProps, {getSecretWord: chooseSecretWord})(UnconnectedApp);
