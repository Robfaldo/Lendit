import React from 'react';
import ItemList from '../components/itemList';
import ItemSubmitForm from '../components/itemSubmitForm';


class Profile extends React.Component {
  render() {
    return(
      <div>
        <ItemList itemsData={this.props.itemListData}/>
        <ItemSubmitForm onSubmit={this.props.handleItemFormSubmit}/>
      </div>
    )
  }
}

export default Profile;
