import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import css from './style.css';

const Toast = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className={css.toast}>
      <div className={css.text}>
        {message}
      </div>
      <i className={classnames("zmdi zmdi-close", css.close)} />
    </div>
  );
}

Toast.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
};

export default connect(
  state => ({
    show: state.toast.show,
    message: state.toast.message,
  }),
  null
)(Toast);


