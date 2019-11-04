//ORIGINAL CODE FOR APP.JS

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';


function AddNewItem(props) {
  return (
    <div>
      <h1>To Do List: </h1>

      <form

      >
        <label>
          <input
            type="text"
            value={props.newItem}
            onChange = {props.handleInputNewItem}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          onClick={props.handleSubmit}
        />
      </form>
    </div>
  );
}

function Item(props) {

// inside square button list
// {props.sqVal}

    return (

      <li>
        <button
          className="square"
          onClick={() => props.handleCheckSquare()}
        >

        </button>

        {props.value}

        <button
          className="deletebutton"

          //change back if it doesnt work
          //onClick={props.handleSubmit}
          onClick={() => props.handleDeleteItem()}
        > Delete
        </button>
      </li>
    );
}

// function Input(props) {
//   return (
//     <button
//       onClick={() => props.handleInputNewItem()}
//     >
//       Input new items here
//     </button>
//   );
// }

// <input
//   type = "text"
//   value = {props.value}
//   onChange = {props.handleInputNewItem}
// >
//   Input a new item here
// </input>


class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: '',
      squares: []/*Array(9).fill(null)*/,
      items: ["Walk the dog"],
      squareX: <h1 className= "xStyle"> X</h1>,
      itemDelete: "",



    };
    //this.handleInputNewItem = this.handleInputNewItem.bind(this);
  }

  callAPI(){
    fetch('http://localhost:9000/testAPI') //maybe change back to 9000??
      .then(res => {
        let thing = res.text()
        console.log(thing)
        return thing
      })
      .then(res => {
        let thing = JSON.parse(res);
        console.log("parsed", thing);
        return thing
      })
      .then(res => {
        console.log("setting state to", res)
        this.setState({items:res});

        // this.setState({squares:res.squares});
        console.log(res);
      })
      .catch(err => err)
  }

  componentDidMount(){
    this.callAPI();
  }




  handleInputNewItem(event) {
    console.log(event.target.value)
    this.setState({itemName: event.target.value});



  }

  handleSubmit(event) {
    //console.log(this.state.items)
    //console.log("the new submitted value is: " + this.event.target.value)
    // this.setState({
    //   itemName: event.target.value,
    //   items: this.state.items.push(this.state.itemName),
    //
    // })
    console.log("submitting", this.state.itemName)

    fetch('http://localhost:9000/testAPI', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({
        //replace with 'newItem'
        'itemName' : this.state.itemName,
      }),
    })
    .then(res => this.callAPI())
    //.then(res => this.setState({itemName:'new'}))

  }

  handleCheckSquare(i) {
    const squares = this.state.squares.slice();

    squares[i] = this.state.squareX
    this.setState({
      squares: squares,

    });

    console.log(squares)
    fetch('http://localhost:9000/testAPI', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({
        'squares' : squares,
      }),
    })

  }

//change to delete in testAPI
  handleDeleteItem(i){
    const items = this.state.items.slice();
    //const itemName = this.state.itemName.slice();

    //const squareX = this.state.squareX.slice();
    //items[i] = this.state.itemDelete
    //squareX = this.state.itemDelete
    // this.setState({
    //   items: items,
    //   //squareX: squareX,
    // })

    console.log(items)
    //console.log(itemName)
    fetch('http://localhost:9000/testAPI', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({
        //'itemName' : this.state.itemName,
        'items' : this.state.items,
      }),
    })

  }

//-------------------------------

/*
handleDeleteItem(i){
  //const items = this.state.items.slice();
  const itemName = this.state.itemName.slice();

  //const squareX = this.state.squareX.slice();
  //items[i] = this.state.itemDelete
  //squareX = this.state.itemDelete
  // this.setState({
  //   items: items,
  //   //squareX: squareX,
  // })

  //console.log(items)
  console.log(itemName)
  fetch('http://localhost:9000/testAPI', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify ({
      'itemName' : this.state.itemName,
      //'items' : this.state.items,
    }),
  })

}
*/

//-------------------------------

/*
  handleDeleteItem(i){
    const items = this.state.items.slice();
    //const squareX = this.state.squareX.slice();
    items[i] = this.state.itemDelete
    //squareX = this.state.itemDelete
    this.setState({
      items: items,
      //squareX: squareX,
    })

    console.log(items)
    fetch('http://localhost:9000/testAPI', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({
        'items' : items,
      }),
    })

  }
*/


  renderItem(i) {
    return (
      <Item
        value={this.state.items[i]}
        //sqVal={this.state.squares[i]}
        handleCheckSquare={() => this.handleCheckSquare(i)}

        //change back if it doesnt work
        handleDeleteItem={() => this.handleDeleteItem(i)}
        //handleDeleteItem={this.handleDeleteItem.bind(this)}
        //handleInputNewItem={() => this.handleInputNewItem()}


        key={i}

        //handleInputNewItem = {this.handleInputNewItem.bind(this)}
        //handleSubmit = {this.handleSubmit.bind(this)}
      />
    );
  }

  render() {
    let itemList = [];
    console.log(this.state.items)
    for(let i = 0; i < this.state.items.length; i++){
      itemList.push(this.renderItem(i))
    }

    return (
      <div className="board-row">



          <AddNewItem
            newItem={this.state.itemName}
            handleInputNewItem = {this.handleInputNewItem.bind(this)}
            handleSubmit = {this.handleSubmit.bind(this)}
          />





        <ul>
            {itemList}
        </ul>
      </div>
    );
  }
}


/*
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.itemName}
              onChange = {this.handleInputNewItem}
            />
          </label>
          <input
            type="submit"
            value="Submit"
            onClick={() => this.handleSubmit()}
          />
        </form>
*/


class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <List />
        </div>
        <div className="game-info">
          <div>{}</div>
          <ol>{}</ol>
        </div>
      </div>
    );
  }
}

// =============================================================================

export default App;
