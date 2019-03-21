import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    time: {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    },
    running: false
  };

  reset = () => {
    this.setState({
      time: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      running: false
    });
  };

  start = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.step(), 10);
    }
  };

  pad0 = value => {
    let result = value.toString();
    if (result.length < 2) {
      result = "0" + result;
    }
    return result;
  };

  stop = () => {
    this.setState({ running: false });
    clearInterval(this.watch);
  };

  step() {
    if (this.state.running) {
      this.calculate();
    }
  }

  calculate() {
    const { time } = this.state;

    const newTime = time;
    newTime.miliseconds += 1;
    if (newTime.miliseconds >= 100) {
      newTime.seconds += 1;
      newTime.miliseconds = 0;
    }
    if (newTime.seconds >= 60) {
      newTime.minutes += 1;
      newTime.seconds = 0;
    }

    this.setState({ time: newTime });
  }

  render() {
    const { minutes, seconds, miliseconds } = this.state.time;
    const stopwatch = `${this.pad0(minutes)}:${this.pad0(seconds)}:${this.pad0(
      Math.floor(miliseconds)
    )}`;
    return (
      <div className="App">
        <nav>
          <button onClick={() => this.start()}>Start</button>
          <button onClick={() => this.stop()}>Stop</button>
          <button onClick={() => this.reset()}>Reset</button>
        </nav>
        <div>
          <div>{stopwatch}</div>
        </div>
        <ul />
      </div>
    );
  }
}

export default App;
