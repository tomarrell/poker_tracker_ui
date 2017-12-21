import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Prompt, Link } from 'react-router-dom';

import { createPlayer } from '../actions';
import { playersSelector } from '../../Overview/selectors';

import css from './style.css';

const DEFAULT_BUYIN = 5;
const LEAVE_PROMPT = "Are you sure you want to leave?";

// Buyin/Walkout cols
const buyinWalkout = [
  <td key="buyin" className={css.buyin}>
    $<input type="number" defaultValue={DEFAULT_BUYIN} step={0.10} min={0} />
  </td>,
  <td key="walkout" className={css.walkout}>
    $<input type="number" step={0.10} />
  </td>
];

// Table structure
const renderTable = (players, isAddingPerson, handleNewPersonChange) => (
  <table className={css.peopleList}>
    <thead>
      <tr>
        <th>Played</th>
        <th>Name</th>
        <th>Buyin</th>
        <th>Walkout</th>
      </tr>
    </thead>
    <tbody>
      {players.map(player => (
        <tr key={player.id}>
          <td className={css.played}><input type="checkbox" /></td>
          <td className={css.name}>{player.name}</td>
          {buyinWalkout}
        </tr>
      ))}
      {isAddingPerson &&
        <tr key="newPlayer">
          <td className={css.played} />
          <td className={css.newPersonName}>
            <input
              placeholder="Name..."
              onChange={handleNewPersonChange}
            />
          </td>
          {buyinWalkout}
        </tr>
      }
    </tbody>
  </table>
);

class NewSession extends Component {
  constructor() {
    super();

    this.state = {
      isAddingPerson: false,
      newPersonName: null,
    };
  }

  handleNewPersonChange = (event) => {
    this.setState({
      newPersonName: event.target.value,
    });
  }

  handleAddPerson = () => {
    const { isAddingPerson } = this.state;

    this.setState({
      isAddingPerson: !isAddingPerson,
    });
  }

  createPlayer = () => {
    const { createPlayer: dispatchCreatePlayer } = this.props;
    const { newPersonName } = this.state;

    dispatchCreatePlayer(newPersonName);
  }

  render() {
    const { isAddingPerson } = this.state;
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

        {renderTable(players, isAddingPerson, this.handleNewPersonChange)}
        <button
          onClick={this.handleAddPerson}
          className={css.newPerson}
        >
          {buttonMessage}
        </button>
        {isAddingPerson && <button onClick={this.createPlayer}>Save new user ✔</button>}

        <form>
          <field>
            <span>Session Date:* </span>
            <input type="date" className={css.dateField} required />
          </field>
          <field>
            <span>Session Time: </span>
            <input type="time" className={css.dateField} />
          </field>
          <Link to="/overview" className={css.close}>Close</Link>
          <button className={css.create} type="submit">Create Session ✔</button>
        </form>
      </div>
    );
  }
}

NewSession.propTypes = {
  players: PropTypes.array.isRequired,
  createPlayer: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    players: playersSelector(state),
  }),
  dispatch => ({
    createPlayer: (name) => dispatch(createPlayer(name)),
  }),
)(NewSession);
