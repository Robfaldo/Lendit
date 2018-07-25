import React from 'react';
import ReactDOM from 'react-dom';
import ItemSubmitForm from '../src/itemSubmitForm';
import ItemList from '../src/itemList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submitFormText: ''}
    this.data = [
      {_id: 'some sort of object id', itemName: 'ostrich egg'},
      {_id: 'some other object id', itemName: 'iPhone charger cable'},
      {_id: 'a third object id', itemName: 'neon green hair tie'}
    ];
    this.handleClick = () => {
      alert(`I've been clicked with ${this.state.submitFormText}`);
      this.setState({submitFormText: ''});

    }
    this.handleSubmitFormTextChange = (event) => {
      this.setState({submitFormText: event.target.value})
    }
  }

  render() {
    return(
      <div>
        <ItemSubmitForm
          handleClick={this.handleClick}
          handleChange={this.handleSubmitFormTextChange}
          value={this.state.submitFormText}
        />
        <ItemList itemsData={this.data}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
