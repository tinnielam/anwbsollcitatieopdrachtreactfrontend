import React, { Component } from "react";
import { render } from "react-dom";
import "./VerkeersinformatieJams.css";
import Data from './VerkeersinformatieJams';
import Map from './GoogleMaps';


render(<Map />, document.getElementById("map"));
render(<Data />, document.getElementById("root"));
