import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import css from './style.css';

const Toast = ({ show, type='success', message }) => {
  if (!show) return null;

  return (
    <div className={classnames(
        css.toast,
        css[type],
      )}
    >
      <div className={css.text}>{message}</div>
      <i className={classnames("zmdi zmdi-close", css.close)} />
    </div>
  );
}

Toast.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default connect(
  state => ({
    show: state.toast.show,
    message: state.toast.message,
    type: state.toast.type,
  }),
  null
)(Toast);


