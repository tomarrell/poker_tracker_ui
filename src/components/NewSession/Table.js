import React from "react";
import PropTypes from "prop-types";
import Autocomplete from "react-autocomplete";
import classnames from "classnames";

import css from "./style.css";
import { DEFAULT_BUYIN } from "./constants";
import { playerNameMatch, toTitleCase } from "../../utils/strings";

const Table = ({
  currentPlayers,
  allPlayers,
  isAddingPerson,
  handleNewPersonChange,
  handleNewPersonSelect,
  newPlayerName,
  handleChangePerson,
  handleKeyPress
}) => (
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
      {currentPlayers.map((player, i) => (
        <tr key={player.id}>
          <td className={css.played}>
            <input type="checkbox" />
          </td>
          <td className={css.name}>{toTitleCase(player.name)}</td>
          <td key="buyin" className={css.buyin}>
            {"$"}
            <input
              onChange={event => handleChangePerson(event, "buyin", player)}
              type="number"
              defaultValue={DEFAULT_BUYIN}
              step={0.1}
              min={0}
              tabIndex={200 + i}
            />
          </td>
          <td key="walkout" className={css.walkout}>
            {"$"}
            <input
              onChange={event => handleChangePerson(event, "walkout", player)}
              type="number"
              step={0.1}
              tabIndex={100 + i}
            />
          </td>
        </tr>
      ))}

      <tr key="nets">
        <td className={css.played} />
        <td className={css.name}>Totals:</td>
        <td key="buyin" className={css.buyin}>
          {currentPlayers
            .reduce((acc, cur) => acc + (cur.buyin || 0), 0)
            .toFixed(2)}
        </td>
        <td key="walkout" className={css.walkout}>
          {currentPlayers
            .reduce((acc, cur) => acc + (cur.walkout || 0), 0)
            .toFixed(2)}
        </td>
      </tr>

      {isAddingPerson && (
        <tr key="newPlayer">
          <td className={css.played} />
          <td className={css.newPersonName}>
            <Autocomplete
              value={newPlayerName}
              inputProps={{
                placeholder: "Name...",
                onKeyPress: handleKeyPress
              }}
              items={allPlayers}
              getItemValue={item => item.name}
              shouldItemRender={(item, term) =>
                !currentPlayers.find(p => p.name === item.name) &&
                playerNameMatch(item, term)
              }
              onChange={handleNewPersonChange}
              onSelect={handleNewPersonSelect}
              renderMenu={children => (
                <div className={css.menu}>{children}</div>
              )}
              renderItem={(player, isHighlighted) => (
                <div
                  className={classnames(css.player, {
                    [css.highlighted]: isHighlighted
                  })}
                  key={player.id}
                >
                  {player.name}
                </div>
              )}
            />
          </td>
          <td key="buyin" className={css.buyin} />
          <td key="walkout" className={css.walkout} />
        </tr>
      )}
    </tbody>
  </table>
);

Table.propTypes = {
  currentPlayers: PropTypes.array.isRequired,
  allPlayers: PropTypes.array.isRequired,
  isAddingPerson: PropTypes.bool.isRequired,
  newPlayerName: PropTypes.string.isRequired,
  handleNewPersonChange: PropTypes.func.isRequired,
  handleNewPersonSelect: PropTypes.func.isRequired,
  handleChangePerson: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired
};

export default Table;
