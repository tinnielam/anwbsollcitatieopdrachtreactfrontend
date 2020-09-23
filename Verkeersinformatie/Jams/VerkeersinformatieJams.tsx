import React from "react";
import Data from "../../AnwbData/AnwbData";

class VerkeersinformatieJams extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      verkeersinformatie: []
    };
  }

  public componentDidMount() {
    fetch("https://anwbtinlam.tinlam.repl.co/verkeersinformatiejams")
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

  private getFilteredJamsData() {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments => segments)
    );
  }

  private renderTableData() {
    this.getFilteredJamsData().map((key, index) => (
      <tr key={key.id}>
        <td>{key.road}</td>
        <td>
          {key.from + " =>"} {key.to}
        </td>
        <td>{key.reason}</td>
        <td>{key.distance / 1000 + " KM"}</td>
        <td>{key.delay / 60}</td>
      </tr>
    ));
  }

  private renderTableHeader(): JSX.Element {
    return (
      <tr>
        <th>Rijksweg</th>
        <th>Traject</th>
        <th>Route</th>
        <th>Reden</th>
        <th>Aantal KM</th>
        <th>Tijd</th>
      </tr>
    );
  }

  public render(): JSX.Element {
    return (
      <div>
        <h1 id="title">Actuele Files</h1>
        <table id="verkeersinformatieJams">
          <tbody>
            {this.renderTableHeader()}
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default VerkeersinformatieJams;