import React from 'react';
import ReactDOM from "react-dom";
import Request from 'react-http-request';
import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Cat />
        <Image src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class Cat extends React.Component{
  constructor() {
    super();
    this.state = {
      url: "ROAN",
    };
  }
  fetchUrl() {

  }

  render () {
    return(
      <Request
        url='https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat'
        method='get'
        accept='application/json'
        verbose={true}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <div>loading...</div>;
            }
            else if (error) {return <div>eRROR...</div>}
            else {
              this.state.url = result.body.data.images.original.url;
              return (
                <div>
                  {JSON.stringify(result.body.data.images.original.url) }
                  <p>{this.state.url}</p>
                  <Image src={this.state.url}/>
                </div>
              );
            }
          }
        }
      </Request>
    );
  }
}

class Image extends React.Component {
  render() {
    return (
      <img
      src={this.props.src}
      alt="new"
      />
    );
  }
}



export default App;
