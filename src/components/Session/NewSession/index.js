import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Prompt, Link } from 'react-router-dom';

import Table from './Table';

import { createPlayer, createSession } from '../actions';
import { playersSelector } from '../../Overview/selectors';

import css from './style.css';
import { DEFAULT_BUYIN, LEAVE_PROMPT } from './constants';

class NewSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddingPerson: false,
      newPlayerName: '',
      players: props.players,
      // time: null,
      date: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { players } = this.state;

    const playerIds = players.map(p => p.id);
    const newPlayersFromStore = nextProps
      .players
      .filter(p => !playerIds.includes(p.id))
      .map(p => ({
        ...p,
        buyin: DEFAULT_BUYIN,
        walkout: null,
      }));

    this.setState({
      players: [...players, ...newPlayersFromStore],
    });
  }

  handleInputChange = (event, key) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleNewPersonChange = (event) => {
    this.setState({ newPlayerName: event.target.value });
  }

  handleAddPerson = () => {
    const { isAddingPerson } = this.state;

    this.setState({
      isAddingPerson: !isAddingPerson,
    });
  }

  handleChangePerson = (event, key, player) => {
    const { players } = this.state;

    const oldPlayerInfo = players.find(p => p.id === player.id);
    const filteredPlayers = players.filter(p => p.id !== player.id);

    const newPlayers = [...filteredPlayers, {
      ...oldPlayerInfo,
      [key]: event.target.value,
    }].map(p => ({
      ...p,
      buyin: parseInt(p.buyin, 10),
      walkout: parseInt(p.walkout, 10),
    }));

    this.setState({
      players: newPlayers,
    });
  }

  createPlayer = () => {
    const { createPlayer: dispatchCreatePlayer } = this.props;
    const { newPlayerName } = this.state;

    dispatchCreatePlayer(newPlayerName);
    this.setState({ newPlayerName: '' });
  }

  handleCreateSession = () => {
    const { createSession: dispatchCreateSession } = this.props;
    const { players: playerSessions, date } = this.state;

    const playDate = new Date(date).toISOString();

    const playerInfo = playerSessions.map(player => {
      if (player.walkout === null) throw new Error('Cannot have null walkout for player');
      return {
        ...player,
        playerId: player.id,
      };
    });

    // TODO merge time and date together
    // TODO add name for session and pass it to API, currently just using time
    dispatchCreateSession(null, playDate, playerInfo);
  }

  render() {
    const { isAddingPerson, newPlayerName } = this.state;
    const { players } = this.props;

    const buttonMessage = isAddingPerson ? 'x Cancel' : '+ Add person';

    return (
      <div className={css.newSession}>
        <Prompt
          when
          message={LEAVE_PROMPT}
        />
        <h2>New Session</h2>

        <hr />

        <Table
          players={players}
          isAddingPerson={isAddingPerson}
          handleNewPersonChange={this.handleNewPersonChange}
          newPlayerName={newPlayerName}
          handleChangePerson={this.handleChangePerson}
        />
        <button
          onClick={this.handleAddPerson}
          className={css.newPerson}
        >
          {buttonMessage}
        </button>
        {isAddingPerson && <button onClick={this.createPlayer}>Save new user ✔</button>}

        <div>
          <div>
            <span>Session Date:* </span>
            <input
              onChange={event => this.handleInputChange(event, 'date')}
              type="date"
              className={css.dateField}
              required
            />
          </div>
          <div>
            <span>Session Time: </span>
            <input
              onChange={event => this.handleInputChange(event, 'time')}
              type="time"
              className={css.dateField}
            />
          </div>
          <Link to="/overview" className={css.close}>Close</Link>
          <button
            onClick={this.handleCreateSession}
            className={css.create}
          >
            Create Session ✔
          </button>
        </div>
      </div>
    );
  }
}

NewSession.propTypes = {
  players: PropTypes.array.isRequired,
  createPlayer: PropTypes.func.isRequired,
  createSession: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    players: playersSelector(state),
  }),
  dispatch => ({
    createPlayer: (name) => dispatch(createPlayer(name)),
    createSession: (name, time, playerSessions) =>
      dispatch(createSession(name, time, playerSessions)),
  }),
)(NewSession);
