import React from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [running, setStart] = useState(false);
  const [time, setTime] = useState({ minutes: 0, seconds: 0, miliseconds: 0 });
  const [watch, setWatch] = useState();

  const resetTime = () => {
    setStart(false);
    setTime({
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    });
    clearInterval(watch);
  };

  const start = () => {
    if (!running) {
      setStart(true);
      setWatch(setInterval(() => calculate(), 10));
    }
  };

  const stop = () => {
    setStart(false);
    clearInterval(watch);
  };

  // const step = () => {
  //   if (running) {
  //     calculate();
  //   }
  // };

  const calculate = () => {
    setTime({ ...time, miliseconds: (time.miliseconds += 1) });
    if (time.miliseconds >= 100) {
      setTime({ ...time, seconds: (time.seconds += 1) });
      setTime({ ...time, miliseconds: (time.miliseconds = 0) });
    }
    if (time.seconds >= 60) {
      setTime({ ...time, minutes: (time.minutes += 1) });
      setTime({ ...time, seconds: (time.seconds = 0) });
    }
    setTime({
      ...time,
      miliseconds: time.miliseconds,
      seconds: time.seconds,
      minutes: time.minutes
    });
  };

  const pad0 = value => {
    let result = value.toString();
    if (result.length < 2) {
      result = "0" + result;
    }
    return result;
  };

  const stopwatch = `${pad0(time.minutes)}:${pad0(time.seconds)}:${pad0(
    Math.floor(time.miliseconds)
  )}`;

  return (
    <div className="App">
      <nav>
        <button onClick={() => start()}>Start</button>
        <button onClick={() => stop()}>Stop</button>
        <button onClick={() => resetTime()}>Reset</button>
      </nav>
      <div>
        <div>{stopwatch}</div>
      </div>
      <ul />
    </div>
  );
};

export default App;
