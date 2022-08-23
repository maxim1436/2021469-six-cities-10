import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';

const Setting = {
  OFFERS_COUNT: 312,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <App
    offersCount = {Setting.OFFERS_COUNT}
    offers = {offers}
    reviews = {reviews}
  />
);
