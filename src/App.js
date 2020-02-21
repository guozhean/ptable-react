import React, { Component } from "react";
import elementsJSON from "./elements.json";
import Element from "./components/Element";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap"
import "./App.css";

const elements = elementsJSON.elements;

class App extends Component {
  state = { molecule: [], molecular_weight: null, grams: 0, moles: 1, formula: '', mass_composition: null };

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
    this.setState({ molecule: [], molecular_weight: null, grams: 0, moles: 1, formula: '', mass_composition: null });
  };

  render() {
    return (
      <Container className="App" fluid={true}>
        <Row>
          <Col>
            <h1>Periodic Table</h1>
          </Col>
          <Col>
            <Button variant='danger' className='float-right' onClick={this.resetState}>Reset</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert variant='info'>
              Click elements below to create a molecule. Molecular weight and each
              element's percent composition by mass will be calculated.
          </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            Moles:
            <Form.Control
              onChange={this.inputMoles}
              name="moles"
              value={this.state.moles}
              type="number"
            />
            Grams:
            <Form.Control
              onChange={this.inputGrams}
              name="grams"
              value={this.state.grams}
              type="number"
            />
          </Col>
          <Col>
            {this.state.formula && <p>Formula: {this.state.formula}</p>}
            {this.state.molecular_weight && <p>Weight: {this.state.molecular_weight.toFixed(3) + " g/mol"}</p>}
            {this.state.mass_composition && <p>Mass Percent: {this.state.mass_composition}</p>}
          </Col>
        </Row>

        {/* main table */}
        <Row className="ptable">
          <Col className="grid-container-main">
            {elements
              .slice(0, 57)
              .concat(elements.slice(71, 89), elements.slice(103, -1))
              .map(element => (
                <Element element={element} add={this.addtomolecule} />
              ))}
          </Col>
        </Row>
        <Row>
          {/* lanthanine series */}
          <Col className="grid-container-la">
            {elements
              .slice(57, 71)
              .concat(elements.slice(89, 103))
              .map(element => (
                <Element element={element} add={this.addtomolecule} />
              ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
