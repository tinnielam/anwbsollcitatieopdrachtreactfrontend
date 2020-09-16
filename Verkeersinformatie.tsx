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

  renderasd() {
    this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => <div>hey</div>)
      )
    );
  }

  renderTableData() {
    this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => (
          <tr key={key.id}>
            <td>{key.road}</td>
            <td>{key.from}</td>
            <td>{key.delay / 60 + " minuten"}</td>
            <td>{key.distance / 1000 + " km"}</td>
            <td>{key.fromLoc.lat}</td>
            <td>{key.fromLoc.lon}</td>
            <td>{key.start}</td>
          </tr>
        ))
      )
    );
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
