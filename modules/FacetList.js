import React from 'react';
import _ from 'lodash';

export class FacetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items.map((x, i) => {
        return { id: i, text: x.name, count: 0, checked: true };
      }),
      open: true,
      all: true
    };
  }

  render() {
    return <fieldset className={this.state.open ? '' : 'closed'}>
      <legend>{this.props.title}</legend>
      <button className={"toggle"} onClick={this.toggle.bind(this)}>
        { this.state.open ? 'Close' : 'Open' }
      </button>
      <a href="" onClick={this.selectAll.bind(this)} className="select-all">
        {this.isAllSelected() ? 'None' : 'All'}
      </a>
      {this.state.items.map(x => 
        <FacetItem key={x.id} {...x} onChange={this.handleChange.bind(this)}/>
      )}
    </fieldset>
  }

  isAllSelected() {
    for (let i = 0; i > this.state.items.length; i++)
      if (! this.state.items[i].checked) return false;
    return true;
  }

  selectAll(e) {
    e.preventDefault();
  }

  toggle(e) {
    e.preventDefault();
    this.setState({ open: ! this.state.open });
  }

  handleChange(e) {
    
  }
}

export class FacetItem extends React.Component {
  render() {
    return <label>
      <input onChange={this.handleChange} type="checkbox" checked={this.props.checked}/>
      <span>{this.props.text}</span>
    </label>;
  }

  handleChange(e) {
    this.props.onChange(e);
  }
}