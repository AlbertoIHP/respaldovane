// in src/MyLogoutButton.js
import { connect } from 'react-redux';
import { userLogout } from 'admin-on-rest';

const MyLogoutButton = ({ userLogout }) => (
    <button onClick={userLogout}>Logout</button>
);

export default connect(undefined, { userLogout })(MyLogoutButton);

// in src/App.js
import MyLoginPage from './MyLoginPage';
import MyLogoutButton from './MyLogoutButton';

const App = () => (
    <Admin loginPage={MyLoginPage} logoutButton={MyLogoutButton} authClient={authClient}>
        ...
    </Admin>
);