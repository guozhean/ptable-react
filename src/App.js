import React, { Component } from "react";
import elementsJSON from "./elements.json";
import Element from "./components/Element";
import "./App.css";

const elements = elementsJSON.elements;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="grid-container">
          {elements
            .slice(0, 57)
            .concat(elements.slice(71, 89), elements.slice(103, -1))
            .map(element => {
              return <Element element={element} />;
            })}
        </div>

        <div class="grid-container-b p78">
          {elements
            .slice(57, 71)
            .concat(elements.slice(89, 103))
            .map(element => {
              return <Element element={element} />;
            })}
        </div>
      </div>
    );
  }
}

export default App;
