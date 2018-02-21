import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../utils/money';
import { toTitleCase } from '../../utils/strings';

import css from './style.css';

const labels = {
  top: ['first/1st', 'second/2nd', 'third/3rd'],
  bottom: ['last', '2nd/last', '3rd/last'],
};

const Champs = ({ champs, title, type }) => (
  <div className={css.champs}>
    <h3 className={css.title}>{title}</h3>
    {champs.map((person, index) => (
      <div key={index} className={css.highlightField}>
        <span>{labels[type][index]}</span>
        <h3 className={css.standoutName}>
          {toTitleCase(person.name)}: {formatCurrency(person.historicalBalance)}
        </h3>
      </div>
    ))}
  </div>
);

Champs.propTypes = {
  champs: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default Champs;
