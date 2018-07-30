import React from 'react';
import Item from './item';

function renderItem(itemData) {
  return (
    <Item
      key={itemData._id}
      itemId={itemData._id}
      itemName={itemData.itemName}
      itemDescription={itemData.itemDescription}
      image={itemData.image}
      handleSubmit={handleSubmit}
    />
  )
}

function handleSubmit(event) {
  console.log(event.target.itemId.value);
  event.preventDefault();
}

function ItemList(props) {
  return (
    <ul>
      {props.itemsData.map(item => renderItem(item))}
    </ul>
  )
}

export default ItemList;
