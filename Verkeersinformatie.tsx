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
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>      
        segments.roadworks.map((key, index) => (
          <tr key={key.id}>          
            <td>{key.road}</td>
            <td>{segments.start + " =>"} {segments.end}</td>      
            <td>{key.from + " =>"} {key.to}</td>
            <td>{key.reason}</td>
          </tr>
        ))
      )
    );
  }

  renderTableHeader() {
    return (
      <tr>
        <th>Rijksweg</th>
        <th>Traject</th>
        <th>Route</th>
        <th>Reden</th>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <h1 id="title">Actuele verkeersinformatie</h1>
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
