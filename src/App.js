import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import ExchangeCurrencies from './components/ExchangeCurrencies';
import ExchangeRate from './components/ExchangeRate';

export default () => (
  <Layout>
        <Route exact path='/' component={ExchangeCurrencies} />
        <Route exact path='/ExchangeRate' component={ExchangeRate} />
        <Route exact path='/ExchangeCurrencies' component={ExchangeCurrencies} />
  </Layout>
);
