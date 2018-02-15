import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import PokerChip from '../../assets/vectors/PokerChip.svg';

import css from './styles.css';

const Loading = ({ isLoading, className, small }) => (
  <div
    className={classnames(
      className,
      {
        [css.loadingWrapper]: isLoading
      },
    )}
  >
    <PokerChip
      className={classnames(
        {
          [css.loading]: isLoading,
          [css.hide]: !isLoading,
          [css.small]: small,
        },
      )}
    />
  </div>
);

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  small: PropTypes.bool,
  className: PropTypes.string,
};

Loading.defaultProps = {
  small: false,
};

export default Loading;
