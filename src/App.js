import React, { Component } from 'react';
import './App.css';
import "react-router";
import {BrowserRouter, Route, NavLink} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className = "App">
        <h1>Dojo Dossier</h1><br></br>
        <h4>Welcome to Dojo Dossier! Create profiles of various people or characters, fictional or real,
          and describe about them by adding various characteristics and traits about them.
        </h4>
        <BrowserRouter>
          <div>
            <Route path = "/" component = {Dossier} />
            <Route path = "/item/:id" component = {Info} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

var names = [];
var id = 1;

class Dossier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      submit: false,
      showTab: false
    }
    this.handleTitle = this.handleTitle.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleTitle(event) {
    var title = event.target.value;
    this.setState({title: title});

    if (title.length > 3) {
      this.setState({submit: true});
    }
  }

  submit(e) {
    e.preventDefault();
    names.push( {name: this.state.title, items: [], id: id } );
    this.setState({title: "", submit: false});
    id++;
  }

  render() {
    var links = [];
    for (var i = 0; i < names.length; i++) {
      links.push(<NavLink className = "tab" key = {i}
      to = {"/item/" + names[i].id}>{names[i].name}</NavLink>);
    }

    return (
      <div id = "main">
        <div id = "newform">
          <form onSubmit = {this.submit}>
            <input type = "text" name = "title" value = {this.state.title} onChange = {this.handleTitle}
            placeholder = "Title"></input>

            <input type = "submit" className = "btn btn-primary" value = "Add New Tab"
            disabled = {!this.state.submit}></input>
          </form>

          <div id = "tabs">
            {links}
          </div>
        </div>
      </div>
    )
  }
}

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      submit: false
    }
    this.handleItem = this.handleItem.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleItem(event) {
    var item = event.target.value;
    this.setState({item: item});

    if (item.length > 3) {
      this.setState({submit: true});
    }
  }

  submit(e) {
    e.preventDefault();
    var id = this.props.match.params.id - 1;
    names[id].items.push(this.state.item);
    this.setState({item: "", submit: false});
  }

  render() {
    var id = this.props.match.params.id - 1;
    var items = names[id].items;
    var content = [];
    for (var j = 0; j < items.length; j++) {
      content.push(<li key = {j}>{items[j]}</li>);
    }

    return (
      <div className = "tabcontent">
        <ul>
          {content}
        </ul>

        <form onSubmit = {this.submit}>
          <input type = "text" name = "title" value = {this.state.item} onChange = {this.handleItem}
          placeholder = "Enter the character's items here" size = "40"></input>

          <input type = "submit" className = "btn btn-secondary" value = "Add Item"
          disabled = {!this.state.submit}></input>
        </form>
      </div>
    )
  }
}

export default App;
