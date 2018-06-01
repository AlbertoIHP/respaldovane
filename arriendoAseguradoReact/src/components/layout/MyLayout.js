// in src/MyLayout.js
import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import MenuPropetary from "../propietary/MenuPropetary";
import MenuArrendatario from "../lessor/MenuLessor";
import MenuAdmin from "../admin/MenuAdmin";

import {
    AdminRoutes,
    AppBar,
    Notification,
    Sidebar,
    setSidebarVisibility,
} from 'admin-on-rest';

const styles = {
    wrapper: {
        // Avoid IE bug with Flexbox, see #467
        display: 'flex',
        flexDirection: 'column',
    },
    sidebar: {
        backgroundColor: '#000',
        height: '100%',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    body: {
        backgroundColor: '#edecec',
        display: 'flex',
        flex: 1,
        overflowY: 'hidden',
        overflowX: 'scroll',
    },
    content: {
        flex: 1,
        padding: '2em',
    },
    loader: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 16,
        zIndex: 1200,
    },
};

class MyLayout extends Component {

    constructor(props) {
        super(props);
        this.state={username:"", rol: ''}
    }
    

    componentWillMount() {
        this.props.setSidebarVisibility(true);
    }

    componentDidMount(){
        let username=localStorage.getItem('username')
        let rol = localStorage.getItem('role');
        this.setState({
            username:username,
            rol: rol 
        })
       
    }

    render() {
        const {
            children,
            customRoutes,
            dashboard,
            isLoading,
            logout,
            menu,
            title,
        } = this.props;

        var MainMenu = null;
        if(this.state.rol == 'admin' ){
            MainMenu = <MenuAdmin style={styles.sidebar}
                logout={logout} username={this.state.username}/>
        }
        else if (this.state.rol == 'propietary'){
            MainMenu = <MenuPropetary style={styles.sidebar}
                logout={logout} username={this.state.username} />
        }
        else{
            MainMenu = <MenuArrendatario style={styles.sidebar}
                logout={logout} username={this.state.username} />
        }

        return (
            <MuiThemeProvider>
                <div style={styles.wrapper}>
                    <div style={styles.main}>
                        <div className="body" style={styles.body}>
                            <div style={styles.content}>
                                {children}
                            </div>
                            <Sidebar >
                                {MainMenu}

                            </Sidebar>
                        </div>
                        <Notification />
                        {isLoading && (
                            <CircularProgress
                                color="#fff"
                                size={30}
                                thickness={2}
                                style={styles.loader}
                            />
                        )}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

MyLayout.propTypes = {
    authClient: PropTypes.func,
    customRoutes: PropTypes.array,
    dashboard: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    isLoading: PropTypes.bool.isRequired,
    menu: PropTypes.element,
    resources: PropTypes.array,
    setSidebarVisibility: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });
export default connect(mapStateToProps, { setSidebarVisibility })(MyLayout);