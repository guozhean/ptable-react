import React from "react";
import "./style.css";

function Element(props) {
  return (
    <div class={`grid-item ${props.element.symbol} `}>
    <p class="atomicnumber">{props.element.number}</p>
    {props.element.symbol}
    <p class="massnumber">
      {props.element.atomic_mass % 1 === 0
        ? props.element.atomic_mass
        : props.element.atomic_mass.toFixed(3).toString()}
    </p>
  </div>
  );
}

export default Element;
