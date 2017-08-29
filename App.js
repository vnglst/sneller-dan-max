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

function formatTime(time) {
  time = Math.round(time)
  let outputTime = time / 1000
  if (time < 10000) {
    outputTime = "0" + outputTime
  }
  while (outputTime.length < 6) {
    outputTime += "0"
  }
  return outputTime
}

const Lamp = ({ on }) =>
  <View style={styles.light}>
    <View style={[styles.lamp, styles.off]} />
    <View style={[styles.lamp, styles.off]} />
    <View style={[styles.lamp, on ? styles.on : styles.off]} />
    <View style={[styles.lamp, on ? styles.on : styles.off]} />
  </View>

const Lights = ({ redLights }) => {
  const lamps = []
  for (let i = 0; i < 5; i++) {
    lamps.push(<Lamp key={i} on={i < redLights ? false : true} />)
  }
  return (
    <View style={styles.lightsContainer}>
      {lamps}
    </View>
  )
}

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
          this.counterIsRunning = false
          this.setState({
            countDown: 5
          })
          this.startTimer()
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
  lightsContainer: {
    flex: 0,
    flexDirection: "row",
    marginBottom: 50
  },
  light: {
    flex: 1,
    margin: 4,
    backgroundColor: "black",
    borderRadius: 10
  },
  lamp: {
    margin: 5,
    backgroundColor: "red",
    padding: 5,
    width: 50,
    height: 50,
    borderRadius: 50
  },
  on: {
    backgroundColor: "red"
  },
  off: {
    backgroundColor: "#333"
  },
  time: {
    marginTop: 50,
    fontFamily: "Menlo-Regular",
    fontSize: 40
  }
})
