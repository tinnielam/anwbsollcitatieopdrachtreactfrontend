import React, { Component } from "react";
import { render } from "react-dom";
import "./VerkeersinformatieJams.css";
import Jams from './VerkeersinformatieJams';
import Map from './GoogleMaps';


render(<Map />, document.getElementById("map"));
render(<Jams />, document.getElementById("root"));
