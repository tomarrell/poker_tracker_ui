import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { hideToast } from './actions';

import css from './style.css';

const Toast = ({ show, type='success', message, dispatchHideToast }) => {
  if (!show) return null;

  return (
    <div className={classnames(
        css.toast,
        css[type],
      )}
    >
      <div className={css.text}>{message}</div>
      <i
        onClick={() => dispatchHideToast()}
        className={classnames("zmdi zmdi-close", css.close)}
      />
    </div>
  );
}

Toast.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
  dispatchHideToast: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    show: state.toast.show,
    message: state.toast.message,
    type: state.toast.type,
  }),
  dispatch => ({
    dispatchHideToast: () => dispatch(hideToast()),
  }),
)(Toast);


