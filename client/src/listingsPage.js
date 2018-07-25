import React from 'react';
import ItemSubmitForm from './itemSubmitForm';
import ItemList from './itemList';

class ListingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submitFormText: '', data: []}
    this.handleClick = () => {
      alert(`I've been clicked with ${this.state.submitFormText}`);
      this.setState({submitFormText: ''});

    }
    this.handleSubmitFormTextChange = (event) => {
      this.setState({submitFormText: event.target.value})
    }
  }

  componentDidMount() {
    this.setState({data: this.props.data})
  }

  render() {
    return(
      <div>
        <ItemSubmitForm
          handleClick={this.handleClick}
          handleChange={this.handleSubmitFormTextChange}
          value={this.state.submitFormText}
        />
        <ItemList itemsData={this.state.data}/>
      </div>
    )
  }
}

export default ListingsPage;
