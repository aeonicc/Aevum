import React from "react";
import butterchurn from "butterchurn";
import butterchurnPresets from "butterchurn-presets";
import Selection from "./songselection";
export default class Visualizer extends React.Component {
  state = {
    visualizer: null,
    audioContext: null,
    canvas: null
  };
  componentDidMount = () => {
    //get width of screen we will make this auto adjust later.
    const width = window.innerWidth;
    const height = window.innerHeight;

    //get state of canvas visualizer and audio context
    let { canvas, visualizer, audioContext } = this.state;

    //get canvas
    canvas = document.getElementById("canvas");

    //set width and height of canvas
    canvas.width = width;
    canvas.height = height;

    //create a new audio context
    audioContext = new AudioContext();

    //create visualizer with butterchurn
    visualizer = butterchurn.createVisualizer(audioContext, canvas, {
      width: width,
      height: height
    });

    //intialize with default values
    this.visualizerIntializer(visualizer, audioContext, canvas, width, height);
  };
  visualizerIntializer = (visualizer, audioContext, canvas, width, height) => {
    visualizer.setRendererSize(width, height);

    this.setState({
      visualizer,
      audioContext,
      canvas
    });

    this.randomPresets();
    this.renderFrames();
  };
  renderFrames = () => {
    let { visualizer } = this.state;
    if (visualizer) {
      visualizer.render();
    }
    setTimeout(() => {
      this.renderFrames(visualizer);
    }, 1000 / 244);
  };
  randomPresets = () => {
    if (this.state.visualizer) {
      this.state.visualizer.loadPreset(
        this.randomProperty(butterchurnPresets.getPresets()),
        2
      ); // 2nd argument is the number of seconds to blend presets
    } else {
      setTimeout(() => {
        this.randomPresets();
      }, 500);
    }
    setTimeout(() => {
      this.randomPresets();
    }, 10000);
  };
  randomProperty = (obj) => {
    let keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
  };

  render() {
    return (
      <>
        <Selection
          Visualizer={this.state.visualizer}
          audioContext={this.state.audioContext}
        />
        <canvas id="canvas" />
      </>
    );
  }
}
