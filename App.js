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
import Time from "./components/Time"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.setState({ countDown: 5, endTime: 'jump start'}, () => {
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
      this.setState({ countDown: 5, endTime: this.time })
  }

  render() {
    return (
      <View style={styles.container}>
        <Lights redLights={this.state.countDown} />
        <Button
          onPress={this.handlePress}
          title="Tap to race, tap again when light go out"
        />
        <Time time={this.state.endTime} />
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
  }
})
