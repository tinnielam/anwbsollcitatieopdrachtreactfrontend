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
    this.state.verkeersinformatie.map(verkeersinformatie => {
      verkeersinformatie.segments.map(segments => {
        segments.jams.map((key, index) => {
          let { id, events, road, from, delay, distance, fromLoc, start } = key; //destructuring
          console.log(key);
          return (
            <tr key={id}>
              <td>{}</td>
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

  renderTableHeader() {
    return (
      <tr>
        <th>Rijksweg</th>
        <th>Route</th>
        <th>Van</th>
        <th>Tot</th>
        <th>Reden</th>
        <th>Vertraging</th>
        <th>Duur</th>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <h1 id="title">Actuele verkeersinformatie Radars</h1>
        <table id="verkeersinformatie">
          <tbody>
            {this.renderTableHeader()}
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Verkeersinformatie;
