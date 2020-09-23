import React, { Component } from "react";
import { render } from "react-dom";
import "./Verkeersinformatie/VerkeersinformatieJams.css";
import Jams from './Verkeersinformatie/VerkeersinformatieJams';
import Map from './GoogleMaps/GoogleMaps';


render(<Map />, document.getElementById("map"));
render(<Jams />, document.getElementById("root"));
