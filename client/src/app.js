import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []}
    this.getItems = () => {
      axios.get('whatever URL')
        .then(res => {
          this.setState({data: res.data})
        });
        .catch((err) => {
          alert(`Couldn't fetch data. The following error occured: ${err}`);
        });
    }
    this.postItem = (item) => {
      axios.post('whatever URL', item)
        .then(res => {
          alert('Your post has been made!')
        })
        .catch(err => {
          alert(`Couldn't post data. The following error occured: ${err}`)
        })
        .then(() => this.getItems());
    }
  }

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
