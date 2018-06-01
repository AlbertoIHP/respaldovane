// in src/comments/ApproveButton.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';
import {BASE_URL} from '../Environment'

class PayButton extends Component {
  handleClick = () => {
    const { push, record, showNotification } = this.props;
    const updatedRecord = { ...record, is_approved: true };

    window.location = BASE_URL + `/pago/${record.id}`

  }

  render() {
    return <FlatButton label="Pagar" onClick={this.handleClick} />;
  }
}

PayButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification: showNotificationAction,
  push: pushAction,
})(PayButton);