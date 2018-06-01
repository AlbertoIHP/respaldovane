// in src/App.js
import React from 'react';
import { simpleRestClient, fetchUtils, Admin, Resource, Delete } from 'admin-on-rest';
import authClient from './authClient';
import MyLayout from "../layout/MyLayout";
import AdminLogin from './AdminLogin';


import { RequestList, RequestShow } from './requests';

import {UserShow} from './users';
import { BASE_URL } from '../Environment';


const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('admintoken');
  const permissions = localStorage.getItem('role');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}

const App = () => (
  <Admin title="Arriendo Asegurado" restClient={simpleRestClient(BASE_URL + '/api/v1', httpClient)} authClient={authClient} appLayout={MyLayout} loginPage={AdminLogin} >
      <Resource name="solicitudes" list={RequestList} show={RequestShow} />
      <Resource name="users" show={UserShow} />
  </Admin>
);

export default App;