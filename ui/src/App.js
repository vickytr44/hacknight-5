import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    address: ""
  };
  async k() {
    const kk = await fetch("https://devils-api-app.azurewebsites.net/get-text");
    await kk.text().then(r => {
      this.setState({
        address: r.toString()
      });
    });
    // console.log(this.state.address);
    // console.log(await kk.text());
    // .then(res => res.json())
    // .then(
    //   result => {
    //     console.log(result);
    //     // this.setState({
    //     //   address: result
    //     // });
    //   },
    //   // Note: it's important to handle errors here
    //   // instead of a catch() block so that we don't swallow
    //   // exceptions from actual bugs in components.
    //   error => {
    //     // this.setState({
    //     //   isLoaded: true,
    //     //   error
    //     // });
    //   }
    // );
  }

  componentDidMount() {
    this.k();
    fetch(
      "http://myproxy201903281609.herokuapp.com/devils-api-app.azurewebsites.net/",
      {
        method: "POST",
        headers: {
          // Accept: "application/text",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: this.state.address })
      }
    ).then(res => {
      console.log(res);
    });
    // console.log(this.state.address);

    // fetch("https://devils-api-app.azurewebsites.net/get-text")
    //   // .then(res => res.json())
    //   .then(
    //     result => console.log(result)
    //     // this.setState({
    //     //   address: result
    //     // });
    //     // },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     // error => {
    //     //   // this.setState({
    //     //   //   isLoaded: true,
    //     //   //   error
    //     //   // });
    //     // }
    //   );
  }
  handleEvent = () => {
    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
    // const ad = this.state.address;
    // (function() {
    //   // <code>
    //   // pull in the required packages.
    //   var sdk = require("microsoft-cognitiveservices-speech-sdk");
    //   var fs = require("browserify-fs");
    //   // replace with your own subscription key,
    //   // service region (e.g., "westus"), and
    //   // the name of the file you want to run
    //   // through the speech recognizer.
    //   var subscriptionKey = "47b288291a16497f9fc3070c74d34b39";
    //   var serviceRegion = "centralus"; // e.g., "westus"
    //   // var filename = "/try3.wav"; // 16000 Hz, Mono
    //   var filename = ad;
    //   console.log(filename);
    //   // create the push stream we need for the speech sdk.
    //   var pushStream = sdk.AudioInputStream.createPushStream();
    //   // open the file and push it to the push stream.
    //   fs.createReadStream(filename)
    //     .on("data", function(arrayBuffer) {
    //       pushStream.write(arrayBuffer.slice());
    //     })
    //     .on("end", function() {
    //       pushStream.close();
    //     });
    //   // we are done with the setup
    //   console.log("Now recognizing from: " + filename);
    //   // now create the audio-config pointing to our stream and
    //   // the speech config specifying the language.
    //   var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    //   var speechConfig = sdk.SpeechConfig.fromSubscription(
    //     subscriptionKey,
    //     serviceRegion
    //   );
    //   // setting the recognition language to English.
    //   speechConfig.speechRecognitionLanguage = "en-US";
    //   // create the speech recognizer.
    //   var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    //   // start the recognizer and wait for a result.
    //   recognizer.recognizeOnceAsync(
    //     function(result) {
    //       console.log(result);
    //       recognizer.close();
    //       recognizer = undefined;
    //     },
    //     function(err) {
    //       console.trace("err - " + err);
    //       recognizer.close();
    //       recognizer = undefined;
    //     }
    //   );
    //   // </code>
    // })();
  };
  // handleChange = e => {
  //   console.log(e.target.files[0]);
  //   // const file = e.target.files[0];
  //   // let reader = new FileReader();
  //   // reader.readAsDataURL(file);
  //   // reader.onload = () => {
  //   //   this.setState({
  //   //     address: reader.result
  //   //   });
  //   // };
  //   // reader.onerror = function(error) {
  //   //   console.log("Error: ", error);
  //   // };

  //   this.setState({
  //     address: e.target.files[0].name
  //   });
  // };

  render() {
    // const k = await fetch("https://devils-api-app.azurewebsites.net/get-text")
    //   .then(res => res.json())
    //   .then(
    //     result => {
    //       console.log(result);
    //       // this.setState({
    //       //   address: result
    //       // });
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     error => {
    //       // this.setState({
    //       //   isLoaded: true,
    //       //   error
    //       // });
    //     }
    //   );
    // console.log(k);
    // console.log(this.state.address);
    return (
      <div className="App">
        <header className="App-header">
          {/* <p>Upload your file</p> */}
          <div className="upload">
            {this.state.address}
            {/* <input
              type="file"
              id="my_file_input"
              onChange={e => this.handleChange(e)}
            /> */}
          </div>
          {/* <div className="button-upload">
            {/* <button
              onClick={() => this.handleEvent()}
              style={{ backgroundColor: "blue", color: "white" }}
            > */}
          {/* upload
            </button> */}
          {/* </div> */}
        </header>
      </div>
    );
  }
}

export default App;
