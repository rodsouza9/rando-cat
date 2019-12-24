import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Cat/>
      </header>
    </div>
  );
}

class Cat extends React.Component {
  STATE_LOADING = "loading";
  STATE_SUCCEEDED = "succeeded";
  STATE_FAILED = "failed";

  constructor() {
    super();
    this.state = {
      src: "",
      fetch_state: this.STATE_LOADING,
    };
    this.loadImage();
  }

  async loadImage() {
    this.setState({
      src: "https://media.giphy.com/media/N256GFy1u6M6Y/giphy.gif",
      fetch_state: this.STATE_LOADING,
    });
    const response = await fetch('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat');
    const myJson = await response.json();
    console.log(myJson);
    if (!myJson.data || !myJson.data.image_url) {
      this.setState({
        src: "https://docs.microsoft.com/en-us/windows/win32/uxguide/images/mess-error-image4.png",
        fetch_state: this.STATE_FAILED,
      });
    } else {
      this.setState({
        src: myJson.data.image_url,
        fetch_state: this.STATE_SUCCEEDED,
      });
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.fetch_state}</p>
        <img src={this.state.src} />
        <div><button onClick={this.loadImage.bind(this)}>Get Cat</button></div>
      </div>
    );
  }
}

export default App;
