const audio = document.getElementById("beep");

class App extends React.Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: "Session",
    loop: undefined,
    isPlaying: false,
  };

  constructor(props) {
    super(props);
    this.loop = undefined;
  }
  ComponentWillUnmount() {
    clearInterval(this.loop);
  }

  handlePlayPause = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({ isPlaying: false });
    } else {
      this.setState({ isPlaying: true });
      this.loop = setInterval(() => {
        const {
          clockCount,
          currentTimer,
          sessionCount,
          breakCount,
        } = this.state;
        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === "Session" ? "Break" : "Session",
            clockCount:
              currentTimer === "Session" ? breakCount * 60 : sessionCount * 60,
          });
          audio.play();
        } else {
          this.setState({ clockCount: clockCount - 1 });
        }
      }, 1000);
    }
  };
  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: "Session",
      isPlaying: false,
    });
    clearInterval(this.loop);
    audio.pause();
    audio.currentTime = 0;
  };

  handleBreakDecrease = () => {
    const { breakCount, isPlaying, currentTimer } = this.state;
    if (breakCount > 1) {
      if (!isPlaying && currentTimer === "Break") {
        this.setState({
          breakCount: breakCount - 1,
          clockCount: (breakCount - 1) * 60,
        });
      } else {
        this.setState({
          breakCount: breakCount - 1,
        });
      }
    }
  };
  handleBreakIncrease = () => {
    const { breakCount, isPlaying, currentTimer } = this.state;
    if (breakCount < 60) {
      if (!isPlaying && currentTimer === "Break") {
        this.setState({
          breakCount: breakCount + 1,
          clockCount: (breakCount + 1) * 60,
        });
      } else {
        this.setState({
          breakCount: breakCount + 1,
        });
      }
    }
  };
  handleSessionDecrease = () => {
    const { sessionCount, isPlaying, currentTimer } = this.state;
    if (sessionCount > 1) {
      if (!isPlaying && currentTimer === "Session") {
        this.setState({
          sessionCount: sessionCount - 1,
          clockCount: (sessionCount - 1) * 60,
        });
      } else {
        this.setState({
          sessionCount: sessionCount - 1,
        });
      }
    }
  };
  handleSessionIncrease = () => {
    const { sessionCount, isPlaying, currentTimer } = this.state;
    if (sessionCount < 60) {
      if (!isPlaying && currentTimer === "Session") {
        this.setState({
          sessionCount: sessionCount + 1,
          clockCount: (sessionCount + 1) * 60,
        });
      } else {
        this.setState({
          sessionCount: sessionCount + 1,
        });
      }
    }
  };

  convertToTime = (count) => {
    let minute = Math.floor(count / 60);
    let seconds = count % 60;
    minute = minute < 10 ? "0" + minute : minute;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minute}:${seconds}`;
  };

  render() {
    const {
      breakCount,
      sessionCount,
      clockCount,
      currentTimer,
      isPlaying,
    } = this.state;

    const breakProps = {
      title: "Break",
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
    };
    const sessionProps = {
      title: "Session",
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease,
    };

    return (
      <div className="App">
        <h1>
          Pomodoro <small>clock</small>
        </h1>
        <div className="container">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        <div className="clock-container">
          <h2 id="timer-label">{currentTimer}</h2>
          <span id="time-left">{this.convertToTime(clockCount)}</span>
          <div className="play-pause-reset">
            <button id="start_stop" onClick={this.handlePlayPause}>
              <i
                className={`fas fa-${isPlaying ? "pause" : "play"}-circle`}
              ></i>
            </button>
            <button id="reset" onClick={this.handleReset}>
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
        <small className="attributtion">
          Built and designed by 🕸️AdeHenryOmoOba🕸️ &copy; 2021
        </small>
      </div>
    );
  }
}

const SetTimer = ({ title, count, handleDecrease, handleIncrease }) => {
  const id = title.toLowerCase();
  return (
    <div className="timer-container">
      <h2 id={`${id}-label`}>{title} Length</h2>
      <div className="btn">
        <button id={`${id}-decrement`} onClick={handleDecrease}>
          <i class="fas fa-arrow-circle-down"></i>
        </button>
        <div className="numbers">
          <span id={`${id}-length`}>{count}</span>
        </div>
        <button id={`${id}-increment`} onClick={handleIncrease}>
          <i class="fas fa-arrow-circle-up"></i>
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
