// in src/App.js
import React from 'react';
import { simpleRestClient, fetchUtils, Admin, Resource, Delete } from 'admin-on-rest';
import authClient from './authClient';
import MyLayout from "../layout/MyLayout";
import MyLoginPage from './MyLoginPage';
import { PropertyList, PropertyShow, PropertyEdit } from './properties';
import { PaymentList, PaymentShow, Home } from './payments';
import { Profile } from './profile';
 import { InsuranceList, InsuranceShow  } from './insurance';

import { BASE_URL } from '../Environment';


const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('propietarytoken');
  const permissions = localStorage.getItem('role');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}

const App = () => (
  <Admin title="Arriendo Asegurado" restClient={simpleRestClient(BASE_URL + '/api/v1', httpClient)} authClient={authClient} appLayout={MyLayout} loginPage={MyLoginPage} >
    <Resource name="seguros" title="Seguros Contratados" list={InsuranceList} show={InsuranceShow}  /> 
    <Resource name="pagos" title="Pagos" list={Home} />
    <Resource name="propiedades" title="Propiedades" list={PropertyList} show={PropertyShow} edit={PropertyEdit} />
    <Resource name="profile" title="Perfil" list={Profile} />
    {/* <Resource name="configuracion" title="Configuración" list={InsuranceList} /> */}
  </Admin>
);

export default App;