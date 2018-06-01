// Menu.js
import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { translate, DashboardMenuItem, MenuItemLink } from "admin-on-rest";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = {
    main: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
        position: "relative"
    },
    leftNavBody: {
        overflowY: "auto",
        overflowX: "hidden",
        paddingTop: "20px",
        height: '100%',
        backgroundColor: '#323232',

    },
    links: {
        color: '#ffffff',
        fontSize: '16px',
        textTransform: 'capitalize',
    },
    leftNavFooter: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        overflow: "hidden",
        paddingTop: "4px",
        color: "#fff",
    }
};

const AdminMenu = ({ onMenuTap, translate, logout, username }) => (
    <div style={styles.main}>
        <div style={styles.leftNavBody}>
            <div className="logo">
                <img src={"/images/logo2.png"} />
            </div>
            <div className="profile">
                <img src={"/images/default.jpg"} />
                <h4>{username}</h4>
            </div>
            <MenuItemLink
                primaryText="Solicitudes"
                leftIcon={<MoreVertIcon />}
                style={styles.links}
                key="res1"
                onClick={onMenuTap}
                to="/solicitudes" />
        </div>
        <div style={styles.leftNavFooter}>
            <Divider />
            <div style={styles.links}>
                {logout}
            </div>
        </div>
    </div>
);

const enhance = compose(
    connect(state => ({
        theme: state.theme,
        locale: state.locale
    })),
    translate
);

export default enhance(AdminMenu);