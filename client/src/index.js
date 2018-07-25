import React from 'react';
import ReactDOM from 'react-dom';
import ListingsPage from '../src/listingsPage';

const data = [
  {_id: 'some sort of object id', itemName: 'ostrich egg'},
  {_id: 'some other object id', itemName: 'iPhone charger cable'},
  {_id: 'a third object id', itemName: 'neon green hair tie'}
];

ReactDOM.render(<ListingsPage data={data} />, document.getElementById('root'));
