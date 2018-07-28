import React from 'react';
import axios from 'axios';

import ListingsPage from './components/listingsPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }


  }

  getItems = () => {
    axios.get('/api/items')
      .then(res => {
        this.setState({data: res.data});
      })
      .catch((err) => {
        console.log(`Couldn't fetch data. The following error occured: ${err}`);
      });
  };

  // postItem = (item) => {
  //     axios.post('/api/items', item)
  //         .then(res => {
  //             console.log('Your post has been made!')
  //         })
  //         .catch(err => {
  //             console.log(`Couldn't post data. The following error occured: ${err}`)
  //         })
  //         .then(() => this.getItems());
  // };

  postItem = (item) =>{
    console.log(item);
    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    }).then(() => this.getItems());
  };

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <div>
        <ListingsPage
          data={this.state.data}
          getRequest={this.getItems}
          postRequest={this.postItem}
        />
      </div>
    )
  }
}

export default App;