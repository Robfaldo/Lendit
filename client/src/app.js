import React from 'react';
import axios from 'axios';

import ListingsPage from './components/listingsPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loggedIn: false,
      user: null,
    }
  }

  componentDidMount() {
    this.getItems();
    this.getUser();
  }

  getUser = () => {
    axios.get('/auth/user').then(response => {
      console.log(response.data);
      if (!!response.data.user) {
        console.log('THERE IS A USER');
        this.setState({
          loggedIn: true,
          user: response.data.user
        })
      } else {
        console.log('THERE IS NOT A USER');
        this.setState({
          loggedIn: false,
          user: null
        })
      }
    })
  };

  getItems = () => {
    axios.get('/api/items')
      .then(res => {
        this.setState({data: res.data});
      })
      .catch((err) => {
        console.log(`Couldn't fetch data. The following error occured: ${err}`);
      });
  };

  _logout = (event) => {
    event.preventDefault();
    console.log('logging out');
    axios.post('/auth/logout').then(response => {
      console.log(response.data);
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        })
      }
    })
  };

  _login = (username, password) => {
    axios
      .post('/auth/login', {
        username,
        password
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          })
        }
      })
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