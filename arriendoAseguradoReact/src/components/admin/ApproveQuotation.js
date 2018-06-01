// in src/comments/ApproveButton.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';
import {BASE_URL} from '../Environment'

class ApproveButton extends Component {
  handleClick = () => {
    const { push, record, showNotification } = this.props;
    const updatedRecord = { ...record, status: "Aprobado" };
    fetch(BASE_URL + `/api/v1/request_accepted/${record.id}`, { method: 'POST', body: updatedRecord })
      .then(() => {
        showNotification('Solicitud aprobada');
        push('/');
      })
      .catch((e) => {
        console.error(e);
        showNotification('Error: comment not approved', 'warning')
      });
  }

  render() {
    return <FlatButton label="Aprobar" onClick={this.handleClick} />;
  }
}

ApproveButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification: showNotificationAction,
  push: pushAction,
})(ApproveButton);