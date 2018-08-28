import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      toDoItem: '',
      items: []
    }
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList() {
    fetch('http://localhost:8080/items')
      .then(data => data.json())
      .then(data => this.setState({ items: data }))
  }

  saveItem = () => {
    fetch('http://localhost:8080/items', {
      method: 'POST',
      body: JSON.stringify({
        value: this.state.toDoItem
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    .then(data => this.fetchList());
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React2</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <br />
          <b>To-Do List</b>
          {this.state.items.map((item, i) => <ToDoItem
            key={item.id}
            text={item.value}
            index={i}
            onDelete={() => {
              const newItems = this.state.items.slice(0);
              newItems.splice(i, 1);
              this.setState({ items: newItems });
            }}
          />)}

          <br />
          Item To Do: <br />
          <input
            onKeyDown={(event) => {
              if (event.key==='Enter') {this.addClicked();}
            }}
            ref={ref => {
              if (!this._input) {
                ref.focus();
              }
              this._input = ref
            }}
            type="text"
            value={this.state.toDoItem}
            onChange={this.changed}
          />
          <button onClick={this.addClicked}>Add</button>
        </p>
      </div>
    );
  }

  changed = (event, value) => {
    this.setState({toDoItem:event.target.value});
  }

  addClicked = () => {
    this.saveItem();
    this.setState({ toDoItem: ''});
    this._input.focus();
  };
}

class ToDoItem extends Component{
  render() {
    return <div>
      {this.props.index}: {this.props.text}
      <button
        style={{ marginLeft: '10px' }}
        onClick={this.props.onDelete}>X</button>
    </div>
  }
}

export default App;
