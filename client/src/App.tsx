import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { MyComponent } from "./cat";
import { cats } from "./catsData";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        {cats.map((cat) => (
          <MyComponent name={cat.name} id={cat.id} key={cat.id}></MyComponent>
        ))}

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

export default App;
