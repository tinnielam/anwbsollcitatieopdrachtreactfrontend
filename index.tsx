import React, { Component } from "react";
import { render } from "react-dom";
import "./Verkeersinformatie/Jams/VerkeersinformatieJams.scss";
import Jams from './Verkeersinformatie/Jams/VerkeersinformatieJams';
import Map from './GoogleMaps/GoogleMaps';


render(<Map />, document.getElementById("map"));
render(<Jams />, document.getElementById("root"));
