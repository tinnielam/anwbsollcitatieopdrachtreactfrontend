import React from "react";

export class VerkeersinformatieData extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
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

  public getJamsData(): JSX.Element {
    return this.state.verkeersinformatie.map(verkeersinformatie =>
      verkeersinformatie.segments.map(segments =>
        segments.jams.map((key, index) => (
          console.log(key)
        ))
      )
    );
  }
}
