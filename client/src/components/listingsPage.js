import React from 'react';

import ItemSubmitForm from './itemSubmitForm';
import ItemList from './itemList';

class ListingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submitFormText: '', data: this.props.data};
    this.handleSubmit = (event) => {
      event.preventDefault();
      this.props.postRequest(
        {itemName: this.state.submitFormText}
      );
      console.log(`User submitted: ${this.state.submitFormText}`);
      this.setState({submitFormText: ''});
    }

    this.handleChange = (event) => {
      this.setState({submitFormText: event.target.value})
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  render() {
    return(
      <div>
        <ItemSubmitForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          value={this.state.submitFormText}
        />
        <ItemList itemsData={this.props.data}/>
      </div>
    )
  }
}

export default ListingsPage;
