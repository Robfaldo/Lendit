import React from 'react';
import ReactDOM from 'react-dom';
import ItemSubmitForm from '../src/itemSubmitForm';
import ItemList from '../src/itemList';

class TemporaryApp extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      {_id: 'some sort of object id', itemName: 'ostrich egg'},
      {_id: 'some other object id', itemName: 'iPhone charger cable'},
      {_id: 'a third object id', itemName: 'neon green hair tie'}
    ];
    this.handleClick = () => {
      alert("I've been clicked!");
    }
  }

  render() {
    return(
      <div>
        <ItemSubmitForm handleClick={this.handleClick}/>
        <ItemList itemsData={this.data}/>
      </div>
    )
  }
}

ReactDOM.render(<TemporaryApp />, document.getElementById('root'));
