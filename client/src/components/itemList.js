import React from 'react';
import Item from './item';

function ItemList(props) {
  function renderItem(itemData) {
    return (
      <Item
        key={itemData._id}
        itemId={itemData._id}
        itemName={itemData.itemName}
        itemDescription={itemData.itemDescription}
        image={itemData.image}
        handleBorrowItem={props.handleBorrowItem}
      />
    )
  }

  return (
    <ul>
      {props.itemsData.map(item => renderItem(item))}
    </ul>
  )
}

export default ItemList;
