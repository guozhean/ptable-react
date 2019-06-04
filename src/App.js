import React, { Component } from "react";
import elementsJSON from "./elements.json";
import Element from "./components/Element";
import "./App.css";

const elements = elementsJSON.elements;

class App extends Component {
  state = { molecule: [], molecular_weight: 0, grams: 0, moles: 1, formula: '' };


  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };
  inputGrams = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
    this.setState({ moles: value / this.state.molecular_weight });
  };
  inputMoles = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
    this.setState({ grams: value * this.state.molecular_weight });
  };

  addtomolecule = element => {
    const arr = this.state.molecule;
    arr.push(element);

    let molecular_weight = this.getmolecularweight(arr);

    this.setState({
      molecule: arr,
      formula: this.getformula(arr),
      molecular_weight: molecular_weight,
      mass_composition: this.getmasspercent(arr),
      grams: this.state.moles * molecular_weight
    });
  };

  getformula = elements => {
    let count = {},
      formula = '';

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

  resetState = () => {
    this.setState({ molecule: [], molecular_weight: 0, grams: 0, moles: 1, formula: '' });
  };

  render() {
    return (
      <div className="App">
        {/* molecule info display */}
        <div className="display">
          <button onClick={this.resetState}>Reset</button>
          <h1>Periodic Table</h1>
          <p>
            Click elements below to create a molecule. Molecular weight and each
            element's percent composition by mass will be calculated.
          </p>

          <div>
            <p>Formula: {this.state.formula}</p>
            <p>
              Weight:
              {this.state.molecular_weight
                ? this.state.molecular_weight.toFixed(3) + " g/mol"
                : null}
            </p>
            <p>Mass Percent: {this.state.mass_composition}</p>
            <div>
              Moles:
                <input
                onChange={this.inputMoles}
                name="moles"
                value={this.state.moles}
                type="number"
              />
            </div>
            <div>
              Grams:
                <input
                onChange={this.inputGrams}
                name="grams"
                value={this.state.grams}
                type="number"
              />
            </div>
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
