import React from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
`;
const Label = styled.label`
  margin: 5px;
  padding: 5px 10px;
  background-color: #696969;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  color: white;
  box-shadow: -4px 4px 14px -1px rgba(0, 0, 0, 0.59);
  transition: 1s;
  &:hover {
    background-color: #ffffff;
    color: black;
  }
`;
const Button = styled.button`
  margin: 5px;
  padding: 5px 10px;
  background-color: #696969;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  color: white;
  box-shadow: -4px 4px 14px -1px rgba(0, 0, 0, 0.59);
  transition: 1s;
  &:hover {
    background-color: #ffffff;
    color: black;
  }
`;
export default class AudioUpload extends React.Component {
  state = {
    audioFile: null,
    audioName: null,
    source: null
  };
  componentDidMount = () => {};
  fileSelecedHandler = (event) => {
    console.log(event.target);
    let { audioFile, source } = this.state;
    if (event.target.files) {
      //if audio file pause it
      if (this.state.audioFile !== null) {
        this.state.audioFile.pause();
      }
      //create audio from upload
      audioFile = new Audio(URL.createObjectURL(event.target.files[0]));

      //set source
      source = this.props.audioContext.createMediaElementSource(audioFile);
      source.connect(this.props.audioContext.destination);

      //play audio
      audioFile.load();
      audioFile.play();

      //connect audio to visualizer
      this.props.Visualizer.connectAudio(source);

      //set state for audiofile and source
      this.setState({
        audioFile,
        source
      });
    } else {
      this.setState({
        audioFile: "",
        audioName: "",
        source
      });
    }
  };
  radio = () => {
    let { audioFile, source } = this.state;

    //if audio file pause it
    if (this.state.audioFile !== null) {
      this.state.audioFile.pause();
    }
    audioFile = new Audio(
      "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Just_Plain_Ant_-_05_-_Stumble.mp3"
    );

    //play audio
    audioFile.load();
    audioFile.play();
    //set source
    source = this.props.audioContext.createMediaElementSource(audioFile);
    source.connect(this.props.audioContext.destination);

    this.props.Visualizer.connectAudio(source);

    this.setState({
      audioFile,
      source
    });
  };
  mic = () => {
    let { source } = this.state;
    if (!navigator.getUserMedia) {
      navigator.getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    }
    navigator.mediaDevices
      .getUserMedia({
        audio: true
      })
      .then(
        (stream) => {
          let ctx = this.props.audioContext;
          source = ctx.createMediaStreamSource(stream);
          this.props.Visualizer.connectAudio(source);
          this.setState({ source });
        },
        (error) => {
          // Something went wrong, or the browser does not support getUserMedia
        }
      );
  };
  playAudio = () => {
    //pause then play again
    console.log(this.state.audioFile);
    if (this.state.audioFile !== null) {
      this.state.audioFile.pause();
      this.state.audioFile.play();
    } else {
    }
  };
  stopAudio = () => {
    //pause
    if (this.state.audioFile !== null) {
      this.state.audioFile.pause();
    } else {
    }
  };

  render() {
    return (
      <Flex>
        <Flex>
          <Label>
            <input
              type="file"
              accept="audio/*"
              onChange={this.fileSelecedHandler}
              style={{ display: "none" }}
            />
            Select Mp3
          </Label>
        </Flex>
        <Flex>
          <Button onClick={this.radio}>Start RADIO</Button>
        </Flex>
        <Flex>
          <Button onClick={this.playAudio}>Play Audio</Button>
          <Button onClick={this.stopAudio}>Stop Audio</Button>
          <Button onClick={this.mic}>Mic Input</Button>
        </Flex>
      </Flex>
    );
  }
}
