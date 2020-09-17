import React, { Component } from "react";
import { render } from "react-dom";
import "./VerkeersinformatieTable.css";
import Data from './Verkeersinformatie';
import Map from './GoogleMaps';


render(<Map />, document.getElementById("map"));
render(<Data />, document.getElementById("root"));
