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
} from "react-native"
import Lights from "./components/Lights.js"
import { formatTime } from "./utils"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      countDown: 5
    }

    this.startTime = null
    this.timer = null
    this.timerIsRunning = false
    this.counterIsRunning = false
    this.counter = null

    this.handlePress = this.handlePress.bind(this)
    this.startCountDown = this.startCountDown.bind(this)
    this.startTimer = this.startTimer.bind(this)
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
    this.setState({ time: 0, countDown: 4 }, () => {
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
    this.setState({ time: 'jump start'}, () => {
      clearInterval(this.counter)
      this.counterIsRunning = false
      this.startOver()
    })
  }

  startTimer() {
    this.timerIsRunning = true
    this.startTime = new Date()
    this.timer = setInterval(() => {
      this.setState({
        time: new Date() - this.startTime
      })
    })
  }

  startOver() {
      this.timerIsRunning = false
      this.counterIsRunning = false
      this.startTime = null
      clearInterval(this.timer)
      this.setState({ countDown: 5 })
  }

  render() {
    return (
      <View style={styles.container}>
        <Lights redLights={this.state.countDown} />
        <Button
          onPress={this.handlePress}
          title="Tap to race, tap again when light go out"
        />
        <Text style={styles.time}>
          {this.state.time === 'jump start' ? 'JUMP START' : formatTime(this.state.time)}
        </Text>
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
    padding: 10
  },
  time: {
    marginTop: 50,
    fontFamily: "Menlo-Regular",
    fontSize: 40
  }
})
