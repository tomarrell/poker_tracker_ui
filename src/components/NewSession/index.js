import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Prompt, Link } from 'react-router-dom';

import Table from './Table';
import Loading from '../Loading';

import { createPlayer, createSessionRequest } from '../Session/actions';
import { playersSelector } from '../Overview/selectors';

import css from './style.css';
import { DEFAULT_BUYIN, LEAVE_PROMPT } from './constants';
import classnames from 'classnames'

class NewSession extends Component {
  constructor(props) {
    super(props);

    const localDate = new Date();
    const currentDateString = localDate.toLocaleDateString().split('/').reverse().join('-');
    const currentTimeString = localDate.toLocaleTimeString();

    this.state = {
      isAddingPerson: false,
      newPlayerName: '',
      allPlayers: props.players,
      currentPlayers: [],
      time: currentTimeString,
      date: currentDateString,
      submitted: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { allPlayers, currentPlayers, isAddingPerson } = this.state;

    const allPlayerIds = allPlayers.map(p => p.id);
    const newPlayersFromStore = nextProps
      .players
      .filter(p => !allPlayerIds.includes(p.id))
      .map(p => ({
        ...p,
        buyin: DEFAULT_BUYIN,
        walkout: null,
      }));

    this.setState({
      currentPlayers: [...currentPlayers, ...(isAddingPerson ? newPlayersFromStore : [])].sort((a, b) => a.name < b.name ? -1 : 1),
      allPlayers: [...allPlayers, ...newPlayersFromStore]
    });
  }

  handleInputChange = (event, key) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleNewPersonChange = (event) => this.setState({ newPlayerName: event.target.value });

  handleNewPersonSelect = (name) => this.setState({ newPlayerName: name });

  handleAddPerson = () => {
    const { isAddingPerson } = this.state;

    this.setState({
      isAddingPerson: !isAddingPerson,
    });
  }

  handleChangePerson = (event, key, player) => {
    const { currentPlayers } = this.state;

    const oldPlayerInfo = currentPlayers.find(p => p.id === player.id);
    const filteredPlayers = currentPlayers.filter(p => p.id !== player.id);

    const newPlayers = [...filteredPlayers, {
      ...oldPlayerInfo,
      [key]: event.target.value,
    }].map(p => ({
      ...p,
      buyin: Number(p.buyin) || DEFAULT_BUYIN,
      walkout: Number(p.walkout),
    }));

    this.setState({
      currentPlayers: newPlayers.sort((a, b) => a.name < b.name ? -1 : 1),
    });
  }

  createPlayer = () => {
    const { createPlayer: dispatchCreatePlayer } = this.props;
    const { newPlayerName, currentPlayers, allPlayers } = this.state;

    const existingPlayer = allPlayers.find(p => p.name === newPlayerName);
    const alreadyAdded = currentPlayers.find(p => p.name === newPlayerName);

    if (alreadyAdded || !newPlayerName.trim()) return

    if (existingPlayer) {
      this.setState({
        currentPlayers: [...currentPlayers, existingPlayer].sort((a, b) => a.name < b.name ? -1 : 1),
        newPlayerName: '',
      });
      return;
    }

    dispatchCreatePlayer(newPlayerName);
    this.setState({ newPlayerName: '' });
  }

  handleCreateSession = () => {
    const { createSessionRequest: dispatchCreateSessionRequest, loading } = this.props;
    if (loading) return;

    const { currentPlayers: playerSessions, date, time, submitted } = this.state;

    const playDate = new Date(`${date}T${time}`);

    const playerInfo = playerSessions.map(player => {
      if (player.walkout === null) throw new Error('Cannot have null walkout for player');
      return {
        ...player,
        playerId: player.id,
      };
    });

    // TODO add name for session and pass it to API, currently just using time
    dispatchCreateSessionRequest(null, playDate, playerInfo);
    this.setState({
      submitted: true,
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') this.createPlayer();
  }

  render() {
    const { currentPlayers, allPlayers, isAddingPerson, newPlayerName, date, time, submitted } = this.state;
    const { loading } = this.props;

    const buttonMessage = isAddingPerson ? 'x Cancel' : '+ Add Person';

    return (
      <div className={css.newSession}>
        <Prompt
          when={!submitted && loading}
          message={LEAVE_PROMPT}
        />
        <h2>New Session</h2>

        <hr />

        <Table
          currentPlayers={currentPlayers}
          allPlayers={allPlayers}
          isAddingPerson={isAddingPerson}
          handleNewPersonChange={this.handleNewPersonChange}
          handleNewPersonSelect={this.handleNewPersonSelect}
          newPlayerName={newPlayerName}
          handleChangePerson={this.handleChangePerson}
          handleKeyPress={this.handleKeyPress}
        />
        <button
          onClick={this.handleAddPerson}
          className={css.newPerson}
        >
          {buttonMessage}
        </button>
        {isAddingPerson && <button onClick={this.createPlayer}>Add User ✔</button>}

        <div>
          <div>
            <span>Session Date:* </span>
            <input
              onChange={event => this.handleInputChange(event, 'date')}
              type="date"
              className={css.dateField}
              value={date}
              required
            />
          </div>
          <div>
            <span>Session Time: </span>
            <input
              onChange={event => this.handleInputChange(event, 'time')}
              type="time"
              className={css.dateField}
              value={time}
            />
          </div>
          <Link to="/overview" className={css.close}>Close</Link>
          <button
            onClick={this.handleCreateSession}
            className={
              classnames(
                {
                  [css.create]: true,
                  [css.loading]: loading,
                },
              )}
          >
            Create Session ✔
          </button>
          <Loading
            className={css.loadingPosition}
            isLoading={loading}
          />
        </div>
      </div>
    );
  }
}

NewSession.propTypes = {
  players: PropTypes.array.isRequired,
  createPlayer: PropTypes.func.isRequired,
  createSessionRequest: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    players: playersSelector(state),
    loading: state.session.loading,
  }),
  dispatch => ({
    createPlayer: (name) => dispatch(createPlayer(name)),
    createSessionRequest: (name, time, playerSessions) =>
      dispatch(createSessionRequest(name, time, playerSessions)),
  }),
)(NewSession);
