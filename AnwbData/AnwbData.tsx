enum VerkeersTypen {
  jams,
  roadworks,
  radars
}

export class AnwbData {
  public anwbJsonData: JSON;
  constructor() {}

  public retrieveAnwbDataFromBackend() {
    fetch(`https://anwbtinlam.tinlam.repl.co/verkeersinformatie${VerkeersTypen.jams}`)
      .then(res => res.json())
      .then(data => (this.anwbJsonData = data));
  }

  public getData() {
    console.log(this.retrieveAnwbDataFromBackend());
  }
}