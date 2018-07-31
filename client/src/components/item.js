import React from 'react';

function Item (props) {
  let imageUrl = "https://makerslendit.s3.amazonaws.com/" + props.image + ".jpg";

  return (
      <li>
        <div className="itemProps">
          <p id="itemName">{props.itemName}</p>
          <p id="itemDescription">{props.itemDescription}</p>
          <img className="itemImage" style={{height:100, width: 100}} src={imageUrl} alt={props.itemName}/>
        </div>
        <form className="itemButtons" onSubmit={props.handleBorrowItem}>
          <input name="itemId" type="hidden" value={props.itemId} />
          <button type="submit" className="itemBorrow" name="itemBorrow">
            Borrow
          </button>
        </form>
      </li>
  )
}

export default Item;
