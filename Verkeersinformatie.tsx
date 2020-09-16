import React from "react";

class Verkeersinformatie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      verkeersinformatie: []
    };
  }

  componentDidMount() {
    fetch("https://anwbtinlam.tinlam.repl.co/verkeersinformatie")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            verkeersinformatie: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  renderTableData() {
    return this.state.verkeersinformatie.map(verkeersinformatie => {
      verkeersinformatie.segments.map(segments => {
        segments.jams.map((key, index) => {
          let { id, events, road, from, delay, distance, fromLoc, start } = key; //destructuring
          console.log(key);
          return (
            <tr key={id}>
              <td>{road}</td>
              <td>{from}</td>
              <td>{delay / 60 + " minuten"}</td>
              <td>{distance / 1000 + " km"}</td>
              <td>{fromLoc.lat}</td>
              <td>{fromLoc.lon}</td>
              <td>{start}</td>
            </tr>
          );
        });
      });
    });
  }

  renderTableData1() {
    return this.state.verkeersinformatie.map((student, index) => {
      const { id, start, stop, email } = student; //destructuring
      return (
        <tr key={id}>
          <td>{start}</td>
          <td>{stop}</td>
          <td>{email}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let verkeersTabelHeader;
    this.state.verkeersinformatie.map(verkeersinformatie => {
      verkeersinformatie.segments.map(segments => {
        verkeersTabelHeader = segments.jams.map(jams => {
          let header = Object.keys(jams);
          return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>;
          });
        });
      });
    });
    return verkeersTabelHeader;
  }

  render() {
    return (
      <div>
        <h1 id="title">Actuele verkeersinformatie Radars</h1>
        <table id="verkeersinformatie">
          <tbody>
            <tr />
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Verkeersinformatie;
