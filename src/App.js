import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSecretWord} from "./actions";
import GuessedWords from "./components/GuessedWords";
import Congrats from "./components/Congrats";
import Input from './components/Input';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success}/>
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {success, guessedWords, secretWord} = state;
  return {success, guessedWords, secretWord};
};

export default connect(mapStateToProps, {getSecretWord})(App);
