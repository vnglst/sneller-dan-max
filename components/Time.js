import React from "react"
import { StyleSheet, Text, View, Animated, Easing } from "react-native"
import { formatTime } from "../utils"

export default class Time extends React.PureComponent {
  componentWillMount() {
    this.animatedValue = new Animated.Value(1)
  }

  componentWillUpdate() {
    this.animatedValue = new Animated.Value(2.5)
  }

  componentDidUpdate() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 700,
      easing: Easing.bounce
    }).start()
  }

  render() {
    const { time } = this.props
    const animatedStyle = { transform: [{ scale: this.animatedValue }] }
    return (
      <Animated.View style={animatedStyle}>
        <Text style={styles.time}>
          {time === "jump start" ? "JUMP START" : formatTime(time)}
        </Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  time: {
    marginTop: 50,
    // fontFamily: "Menlo-Regular",
    fontSize: 40
  }
})
