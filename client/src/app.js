import React from 'react';
import axios from 'axios';
import {
  // BrowserRouter,
  Route,
  // Switch
} from 'react-router-dom';
import './app.css';

import ListingsPage from './containers/listingsPage';
import Home from './containers/home';
import NavBar from './components/navBar';
import Footer from './components/footer';
import Profile from './containers/profile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loggedIn: false,
      user: null
    };
    this.getUser = this.getUser.bind(this);
    this.getItems = this.getItems.bind(this);
    this.postItem = this.postItem.bind(this);
    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
  }

  componentDidMount() {
    this.getItems();
    this.getUser();
  }

  getUser() {
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

  getItems() {
    axios.get('/api/items')
      .then(res => {
        this.setState({data: res.data});
      })
      .catch((err) => {
        console.log(`Couldn't fetch data. The following error occured: ${err}`);
      });
  };

  _logout(event) {
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

  _login(username, password) {
    console.log(`trying to log in with ${username}:${password}`);
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
  }

  // change this to axios later
  postItem(item) {
    console.log(item);
    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    }).then(() => this.getItems());
  }


  render() {
    return (
      <div className="all">
        {/*<BrowserRouter>*/}
        {/*<Switch>*/}
        <header className="header">
          <NavBar
            loggedIn={this.state.loggedIn}
            _logout={this._logout}
            userDetails={this.state.user}
          />
        </header>
        <main className="main">
          <Route exact path="/" component={
              () => {
                if (this.state.loggedIn) {
                  return (
                    <ListingsPage
                      data={this.state.data}
                      getRequest={this.getItems}
                      postRequest={this.postItem}
                      user={this.state.user}
                    />
                  )
                }
                else {
                  return <Home handleSignInSubmit={this._login}/>
                }
              }
            }
          />
          <Route exact path="/profile" component={
              () => {
                if (this.state.loggedIn) {
                  return (
                    <Profile
                      userDetails={this.state.user}
                      itemsData={this.props.data}
                    />
                  )
                }
                else {
                  return (
                    <Home handleSignInSubmit={this._login} />
                  )
                }
              }
            }
          />
        </main>
        <footer>
          <Footer
            loggedIn={this.state.loggedIn}
            _logout={this._logout}
            userDetails={this.state.user}
          />
        </footer>
        {/*</Switch>*/}
      {/*</BrowserRouter>*/}
      </div>
    )
  }
}

export default App;
