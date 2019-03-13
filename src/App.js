import React, { Component } from "react";
import elementsJSON from "./elements.json";
import Element from "./components/Element";
import "./App.css";

const elements = elementsJSON.elements;

class App extends Component {
  state = {
    molecule: [],
    formula: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  addtomolecule = element => {
    const arr = this.state.molecule;
    arr.push(element);
    this.setState({
      molecule: arr,
      formula: this.getformula(this.state.molecule),
      molecular_weight: this.getmolecularweight(this.state.molecule),
      mass_composition: this.getmasspercent(this.state.molecule)
    });
    console.log(arr);
  };

  getformula = elements => {
    let count = {};
    let formula = "";

    elements.map(element => {
      if (!count[element.symbol]) {
        count[element.symbol] = 1;
      } else {
        count[element.symbol]++;
      }
    });
    for (let key in count) {
      formula += key;

      if (count[key] === 1) {
      } else {
        formula += count[key];
      }
    }

    return formula;
  };

  getmolecularweight = elements => {
    let molecular_weight = 0;

    elements.map(element => {
      molecular_weight += element.atomic_mass;
    });

    return molecular_weight;
  };

  getmasspercent = elements => {
    let mass = {};
    let totalMass = 0;
    let mass_composition = "";

    elements.map(element => {
      totalMass += element.atomic_mass
    });

    elements.map(element => {
      if (!mass[element.symbol]) {
        mass[element.symbol] = ((element.atomic_mass / totalMass) * 100)
      } else {
        mass[element.symbol] += ((element.atomic_mass / totalMass) * 100) 
      }
    });

    for (let key in mass) {
      mass_composition += key;
      mass_composition += " ";
      mass_composition += mass[key].toFixed(2)+"%";
      mass_composition += " ";
    }

    return mass_composition;
  }

  render() {
    return (
      <div className="App">


        <div className="display">
          <h2>Molecule</h2>
          <p>Formula: {this.state.formula}</p>
          <p>Weight: {this.state.molecular_weight}</p>
          <p>Mass Percent: {this.state.mass_composition}</p>

        </div>



        <div class="grid-container">
          {elements
            .slice(0, 57)
            .concat(elements.slice(71, 89), elements.slice(103, -1))
            .map(element => {
              return <Element element={element} add={this.addtomolecule} />;
            })}
        </div>

        <div class="grid-container-la">
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
