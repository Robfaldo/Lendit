import React from 'react';
import HomepageTitle from '../components/homepageTitle';
import HomepageDisplay from '../components/homepageDisplay';
import HomepageDisplayToggle from '../components/homepageDisplayToggle';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displayToggleState: 'sign-up'};
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    this.setState({displayToggleState: event.target.value});
  }

  render() {
    return (
      <div className="container" style={{textAlign: "center"}}>
        <HomepageTitle />
        <HomepageDisplay
          displayToggleState={this.state.displayToggleState}
          handleSignInSubmit={this.props.handleSignInSubmit}
        />
        <HomepageDisplayToggle handleToggle={this.handleToggle} />
      </div>
    )
  }
}

export default Home;
