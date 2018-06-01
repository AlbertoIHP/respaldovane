// in src/App.js
import React from 'react';
import { simpleRestClient, fetchUtils, Admin, Resource, Delete } from 'admin-on-rest';
import authClient from './authClient';
import { PaymentList, PaymentShow } from './payments';
import LessorLogin from "./LessorLogin";
import MyLayout from "../layout/MyLayout";



import { BASE_URL } from '../Environment';


const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('lessortoken');
  const permissions = localStorage.getItem('role');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}

const App = () => (
  <Admin title="Arriendo Asegurado" restClient={simpleRestClient(BASE_URL + '/api/v1', httpClient)} authClient={authClient} loginPage={LessorLogin} appLayout={MyLayout}  >
    <Resource name="pagos" title="Pagos" list={PaymentList} />
  </Admin>
);

export default App;