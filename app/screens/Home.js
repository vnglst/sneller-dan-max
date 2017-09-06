/* 
    Based upon: f1-start.glitch.me/
    By @jaffathecake

*/

import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from "react-native"
import Lights from "../components/Lights.js"
import Time from "../components/Time"
// import NewHighscore from "../components/NewHighscore"
import { formatTime, isNumber } from "../utils"
import {
  getStateFromLocalstorage,
  saveStateToLocalStorage
} from "../utils/localstorage"

import api from "../utils/api"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      personalBest: null,
      endTime: 0,
      countDown: 5,
      highscores: [],
      highscoresLoading: true,
      isNewHighscore: false
    }

    this.time = 0
    this.startTime = null
    this.timer = null
    this.timerIsRunning = false
    this.counterIsRunning = false
    this.counter = null

    this.handlePress = this.handlePress.bind(this)
    this.startCountDown = this.startCountDown.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.loadState = this.loadState.bind(this)
    this.saveState = this.saveState.bind(this)
    this.getHighscoresFromApi = this.getHighscoresFromApi.bind(this)
    this.checkHighscore = this.checkHighscore.bind(this)
  }

  static navigationOptions = {
    title: "Faster than Max"
  }

  componentDidMount() {
    this.loadState()
    // this.getHighscoresFromApi()
  }

  async loadState() {
    try {
      const state = await getStateFromLocalstorage()
      if (state !== null) {
        this.setState({ personalBest: state.personalBest })
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error retrieving from localstorage:", error)
    }
  }

  async getHighscoresFromApi() {
    try {
      const highscores = await api.getHighscores()
      if (highscores !== null) {
        this.setState({ highscores, highscoresLoading: false })
      }
    } catch (e) {
      console.log("Error loading highscores", e)
    }
  }

  handlePress() {
    if (this.timerIsRunning) {
      this.startOver()
      return
    }

    if (this.counterIsRunning) {
      this.handleJumpstart()
      return
    }

    this.startCountDown()
  }

  startCountDown() {
    this.setState({ countDown: 4 }, () => {
      this.counterIsRunning = true
      this.counter = setInterval(() => {
        if (this.state.countDown > 0) {
          this.setState({
            countDown: this.state.countDown - 1
          })
        } else {
          clearInterval(this.counter)
          this.counter = setTimeout(() => {
            this.counterIsRunning = false
            this.setState({ countDown: 5 })
            this.startTimer()
          }, Math.random() * 1000)
        }
      }, 1000)
    })
  }

  handleJumpstart() {
    this.setState({ countDown: 5, endTime: null }, () => {
      clearInterval(this.counter)
      this.counterIsRunning = false
      this.time = 0
      this.startTime = null
      clearInterval(this.timer)
    })
  }

  startTimer() {
    this.timerIsRunning = true
    this.startTime = new Date()
    this.timer = setInterval(() => {
      this.time = new Date() - this.startTime
    })
  }

  startOver() {
    this.timerIsRunning = false
    this.counterIsRunning = false
    this.startTime = null
    clearInterval(this.timer)

    let personalBest = isNumber(this.state.personalBest)
      ? this.state.personalBest
      : this.time
    if (isNumber(this.time)) {
      personalBest = this.time < personalBest ? this.time : personalBest
    }

    // this.checkHighscore()

    this.setState(
      {
        countDown: 5,
        endTime: this.time,
        personalBest
      },
      this.saveState
    )
  }

  checkHighscore() {
    const { highscores } = this.state
    console.log("Checking highscore")
    // check if this.time is better than one of highscore?
    // show popup "Nieuwe highscore!" --> this.setState({ isNewHighscore: true })
    // with text input field for highscore
    // open highscore window, show new highscore list
  }

  async saveState() {
    try {
      console.log("Saving to local storage", this.state)
      await saveStateToLocalStorage(this.state)
    } catch (error) {
      // Error saving data
      console.log("Error saving date to localstorage:", error)
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const { endTime, personalBest } = this.state
    return (
      <View style={styles.container}>
        <Lights numberOfLightsOn={this.state.countDown} />
        <TouchableHighlight
          onPress={this.handlePress}
          underlayColor="white"
          activeOpacity={0.7}
        >
          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>Tap to race!</Text>
          </View>
        </TouchableHighlight>
        <Time
          timeStr={endTime !== null ? formatTime(endTime) : "JUMP START!"}
        />
        <Text style={styles.personalRecord}>
          Personal best:{" "}
          {personalBest !== null ? formatTime(personalBest) : "-"}
        </Text>
        <View style={styles.footer}>
          {/* <Button
            color="black"
            title="🏆"
            onPress={() => {
              navigate("Highscores", {
                highscores: this.state.highscores,
                isLoading: this.state.highscoresLoading
              })
            }}
          /> */}
          <Button
            color="black"
            title="👨‍💻"
            onPress={() => {
              navigate("About")
            }}
          />
        </View>
        {/* <NewHighscore
          modalVisible={this.state.isNewHighscore}
          onCloseModal={() => {
            this.setState({ isNewHighscore: false })
          }}
        /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    backgroundColor: "white"
  },
  startButton: {
    backgroundColor: "red",
    padding: 8,
    borderWidth: 10,
    borderRadius: 20,
    borderColor: "red"
  },
  startButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  personalRecord: {},
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
})
