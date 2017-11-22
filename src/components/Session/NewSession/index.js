import React, { Component } from 'react';
import { Prompt, Link } from 'react-router-dom';

import css from './style.css';

const peopleList = [
  {
    id: 1,
    name: 'Tom'
  },
  {
    id: 2,
    name: 'Liam'
  },
  {
    id: 3,
    name: 'Hannah'
  },
];

const DEFAULT_BUYIN = 5;
const LEAVE_PROMPT = "Are you sure you want to leave?";

// Buyin/Walkout cols
const buyinWalkout = [
  <td className={css.buyin}>
    $<input type="number" defaultValue={DEFAULT_BUYIN} step={0.10} min={0} />
  </td>,
  <td className={css.walkout}>
    $<input type="number" step={0.10} />
  </td>
];

// Table structure
const renderTable = (people, isAddingPerson) => (
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
      {people.map(person => (
        <tr key={person.id}>
          <td className={css.played}><input type="checkbox" /></td>
          <td className={css.name}>{person.name}</td>
          {buyinWalkout}
        </tr>
      ))}
      {isAddingPerson &&
        <tr>
          <td className={css.played} />
          <td className={css.newPersonName}><input placeholder="Name..." /></td>
          {buyinWalkout}
        </tr>
      }
    </tbody>
  </table>
);

export default class NewSession extends Component {
  constructor() {
    super();

    this.state = {
      isAddingPerson: false,
    };

    this.handleAddPerson = this.handleAddPerson.bind(this);
  }

  handleAddPerson() {
    const { isAddingPerson } = this.state;

    this.setState({
      isAddingPerson: !isAddingPerson,
    });
  }

  render() {
    const { isAddingPerson } = this.state;

    const buttonMessage = isAddingPerson ? 'x Cancel' : '+ Add person';

    return (
      <div className={css.newSession}>
        <Prompt
          when
          message={LEAVE_PROMPT}
        />
        <h2>New Session</h2>

        <hr />

        {renderTable(peopleList, isAddingPerson)}
        <button
          onClick={this.handleAddPerson}
          className={css.newPerson}
        >
          {buttonMessage}
        </button>
        {isAddingPerson && <button>Save new user ✔</button>}

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

