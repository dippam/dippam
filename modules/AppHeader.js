import React from 'react';
import NavLink from './NavLink';
import Logo from './Logo';
import { browserHistory } from 'react-router';
import Search from './Search';

export default class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <header>
      <NavLink to="/"><Logo {...this.props}/></NavLink>
      <nav id="primary"> 
        <NavLink to="/collections">Collections</NavLink>
	<NavLink to="/team">About</NavLink>
      	<NavLink to="/policies/ethical-use">Ethical Use</NavLink>
      </nav>
      <input name="q" type="search" placeholder="Search Query" onChange={this.query} value={this.props.params.query} />
    </header>;
  }

  query(e) {
    const q = e.target.value;
    browserHistory.push("/search/" + q);
    new Search().query(q);
  }
}