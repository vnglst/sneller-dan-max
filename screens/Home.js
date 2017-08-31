/* 
    Based upon: f1-start.glitch.me/
    By @jaffathecake

*/

import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import Lights from "../components/Lights.js"
import Time from "../components/Time"
import { formatTime, isNumber } from "../utils"
import {
  getStateFromLocalstorage,
  setStateFromLocalstorage
} from "../utils/localstorage"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      personalBest: null,
      endTime: 0,
      countDown: 5
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
  }

  static navigationOptions = {
    title: "Sneller dan Max"
  }

  componentDidMount() {
    this.getStateFromLocalStorage()
  }

  async getStateFromLocalStorage() {
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

    this.setState(
      {
        countDown: 5,
        endTime: this.time,
        personalBest
      },
      this.saveStateToLocalStorage
    )
  }

  async saveStateToLocalStorage() {
    try {
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
        <Button
          onPress={this.handlePress}
          title="Tap to race, tap again when the lights go out"
        />
        <Time
          timeStr={endTime !== null ? formatTime(endTime) : "JUMP START!"}
        />
        <Text style={styles.personalRecord}>
          Personal best:{" "}
          {personalBest !== null ? formatTime(personalBest) : "-"}
        </Text>
        <View style={styles.footer}>
          <View>
            <Button
              color="black"
              title="👨‍💻"
              onPress={() => {
                navigate("About")
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  personalRecord: {
    marginTop: 50
  },
  footer: {
    width: '100%',
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
})
