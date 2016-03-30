import React from 'react';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { facets: require('json!../../data/facets') };
  }

  render() {
    return <div className="page" id="search">
      <form id="query">
        <Select title="Search Mode" items={this.state.facets.mode}/>
        <FacetList title="Collections" items={this.state.facets.db}/>
        <FacetList title="Time Period" items={this.state.facets.period}/>
        <FacetList title="Document Types" items={this.state.facets.documentTypes}/>
        <FacetList title="Demographics" items={this.state.facets.demographics}/>
        <FacetList title="Places" items={this.state.facets.places}/>
      </form>
      <div id="results">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Breviate Title</th>
              <th>Session</th>
              <th>Pages</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>;
  }
}

class Select extends React.Component {
  render() {
    return <fieldset>
      <legend>{this.props.title}</legend>
      <select name="mode" onChange={this.handleChange}>
        {this.props.items.map(x =>
          <option key={x.id} value={x.id}>{x.name}</option>
        )}
      </select>
    </fieldset>;
  }

  handleChange(e) {
    e.preventDefault();
    this.props.handleChange();
  }
}

class FacetList extends React.Component {
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

    // Select None
    this.setState({ all: false });   
  }

  toggle(e) {
    e.preventDefault();
    this.setState({ open: ! this.state.open });
  }

  handleChange(e) {
    
  }
}

class FacetItem extends React.Component {
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