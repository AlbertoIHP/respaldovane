import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';

import { Notification, translate, userLogin as userLoginAction } from 'admin-on-rest';

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        minWidth: 300,
        padding: 15,
        textAlign: 'center',
    },
    avatar: {
        margin: '1em',
        textAlign: 'center ',
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        display: 'flex',
    },
    hint: {
        textAlign: 'center',
        marginTop: '1em',
        color: '#ccc',
    },
};

function getColorsFromTheme(theme) {
    if (!theme) return { primary1Color: cyan500, accent1Color: pinkA200 };
    const {
        palette: {
            primary1Color,
            accent1Color,
        },
      } = theme;
    return { primary1Color, accent1Color };
}

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) =>
    <TextField
        errorText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />;

class Login extends Component {
    toArrendatario(e) {
        e.preventDefault();
        browserHistory.push('/arrendatarios#/login');
    }
    toHome(e) {
        e.preventDefault();
        browserHistory.push('/home');
    }
    login = ({ username, password }) => {
        const { userLogin, location } = this.props;
        userLogin({ username, password }, location.state ? location.state.nextPathname : '/');
    }

    render() {
        const { handleSubmit, submitting, theme, translate } = this.props;
        const muiTheme = getMuiTheme(theme);
        const { primary1Color, accent1Color } = getColorsFromTheme(muiTheme);
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{ ...styles.main, backgroundColor: "#f7f7f7" }}>
                    <div className="text-center" style={{ marginBottom: '20px' }}>
                        <img src={"/images/logo.png"} onClick={this.toHome} />
                    </div>
                    <Card style={styles.card}>
                        <h3 style={{marginTop: '5px', fontSize: '24px' }}>Portal Propietarios</h3>

                        {/* <div style={styles.avatar}>
                            <Avatar backgroundColor={accent1Color} icon={<LockIcon />} size={60} />
                        </div> */}
                        <form onSubmit={handleSubmit(this.login)} className="form-login">
                            <div style={styles.form}>
                                {/* <p style={styles.hint}>Hint: demo / demo</p> */}
                                <div style={styles.input} >
                                    <Field
                                        name="username"
                                        component={renderInput}
                                        floatingLabelText={translate('aor.auth.username')}
                                    />
                                </div>
                                <div style={styles.input}>
                                    <Field
                                        name="password"
                                        component={renderInput}
                                        floatingLabelText={translate('aor.auth.password')}
                                        type="password"
                                    />
                                </div>
                            </div>
                            <CardActions>
                                <RaisedButton type="submit" className="button-login" disabled={submitting} label={translate('aor.auth.sign_in')} fullWidth />
                            </CardActions>
                        </form>
                    </Card>
                    <Notification />
                    <div className="text-center" style={{marginTop: '50px'}}>
                        <a href="" onClick={this.toArrendatario}> <i className="fa fa-user"></i> Acceder como Arrendatario</a>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

Login.propTypes = {
    ...propTypes,
    authClient: PropTypes.func,
    previousRoute: PropTypes.string,
    theme: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

Login.defaultProps = {
    theme: {},
};

const enhance = compose(
    translate,
    reduxForm({
        form: 'signIn',
        validate: (values, props) => {
            const errors = {};
            const { translate } = props;
            if (!values.username) errors.username = translate('aor.validation.required');
            if (!values.password) errors.password = translate('aor.validation.required');
            return errors;
        },
    }),
    connect(null, { userLogin: userLoginAction }),
);

export default enhance(Login);