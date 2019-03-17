import React, { Component } from "react";
import elementsJSON from "./elements.json";
import Element from "./components/Element";
import "./App.css";

const elements = elementsJSON.elements;

class App extends Component {
  state = { molecule: [] };

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  addtomolecule = element => {
    const arr = this.state.molecule;
    arr.push(element);

    this.setState({
      molecule: arr,
      formula: this.getformula(arr),
      molecular_weight: this.getmolecularweight(arr),
      mass_composition: this.getmasspercent(arr)
    });
  };

  getformula = elements => {
    let count = {},
      formula = "";

    elements.forEach(element => {
      if (!count[element.symbol]) count[element.symbol] = 1;
      else count[element.symbol]++;
    });

    for (let ele in count) {
      formula += ele;
      if (count[ele] !== 1) formula += count[ele];
    }

    return formula;
  };

  getmolecularweight = elements => {
    let molecular_weight = 0;

    elements.forEach(element => (molecular_weight += element.atomic_mass));

    return molecular_weight;
  };

  getmasspercent = elements => {
    let mass = {},
      molecular_weight = 0,
      mass_composition = "";

    elements.forEach(element => (molecular_weight += element.atomic_mass));

    elements.forEach(element => {
      const proportion = (element.atomic_mass / molecular_weight) * 100;

      if (!mass[element.symbol]) mass[element.symbol] = proportion;
      else mass[element.symbol] += proportion;
    });
    for (let ele in mass) {
      mass_composition += `${ele}-${mass[ele].toFixed(2)}%, `;
    }
    return mass_composition;
  };

  resetState = () =>{
    this.setState({
      molecule: [],
      formula: "",
      molecular_weight: 0,
      mass_composition: ""
    });
  }

  render() {
    return (
      <div className="App">
        {/* molecule info display */}
        <div className="display">
        <button onClick={this.resetState}>Reset</button>
          <h1>Periodic Table</h1>
          <p>Click on an element to add it to the molecule.</p>

          <div class="columns-3">
            <p class="col">Formula: {this.state.formula}</p>
            <p class="col">
              Weight:{" "}
              {this.state.molecular_weight
                ? this.state.molecular_weight.toFixed(3) + " g/mol"
                : null}
            </p>
            <p class="col">Mass Percent: {this.state.mass_composition}</p>
          </div>
        </div>
        

        {/* main table */}
        <div class="ptable">
          <div class="grid-container-main">
            {elements
              .slice(0, 57)
              .concat(elements.slice(71, 89), elements.slice(103, -1))
              .map(element => (
                <Element element={element} add={this.addtomolecule} />
              ))}
          </div>

          {/* lanthanine series */}
          <div class="grid-container-la">
            {elements
              .slice(57, 71)
              .concat(elements.slice(89, 103))
              .map(element => (
                <Element element={element} add={this.addtomolecule} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
